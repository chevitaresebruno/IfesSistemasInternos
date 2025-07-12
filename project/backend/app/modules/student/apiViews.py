from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.authentication import TokenAuthentication
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from rest_framework.exceptions import NotFound
from .models import *
from .serializers import *

from datetime import datetime, date
from rest_framework_simplejwt.views import TokenObtainPairView


class PhoneViewSet(ModelViewSet):
    queryset = Phone.objects.all()
    serializer_class = PhoneSerializer
    
class EmailViewSet(ModelViewSet):
    queryset = Email.objects.all()
    serializer_class = EmailSerializer
    
class BankViewSet(ModelViewSet):
    queryset = Bank.objects.all()
    serializer_class = BankSerializer
    
class BankAccountTypeViewSet(ModelViewSet):
    queryset = BankAccountType.objects.all()
    serializer_class = BankAccountTypeSerializer
    
class CourseViewSet(ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer 
    
class StatusAcademicViewSet(ModelViewSet):
    queryset = StatusAcademic.objects.all()
    serializer_class = StatusAcademicSerializer

class StudentCreateApiView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = [TokenAuthentication]
    
    @swagger_auto_schema(
        operation_description="Create a new student.",
        request_body=StudentCreateSerializer,
        responses={201: StudentCreateSerializer, 400: 'Validation Error'},
    )
    def post(self, request, format = None):
        serializer = StudentCreateSerializer(data=request.data)
        
        if serializer.is_valid():
            student: Student = serializer.save()
            user = User.objects.create(username=student.cpf, password="temp")
            user.set_password(student.getMatricule())
            user.save()
            student.user = user
            student.save()
            
            print(f"'{user.username}'")
            print(f"'{user.password}'")
            
            return Response(StudentCreateSerializer(student).data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class StudentViewSet(ModelViewSet):
    queryset = Student.objects.all()
    
    def get_serializer_class(self):
        if self.action in ['list', 'retrieve']:
            return StudentReadSerializer
        return StudentWriteSerializer
    
    
class AuxilioRelationViewSet(ModelViewSet):
    queryset = AuxilioRelation.objects.all()
    serializer_class = AuxilioRelationSerializer



class GetAuxilioFromAluno(APIView):
    """
    Endpoint que retorna os auxílios de um aluno com base no ano e semestre
    """

    def get(self, request, student_id, year, semester):
        if not (student_id and year and semester):
            return Response({"detail": "Parâmetros student_id, year e semester são obrigatórios."}, status=400)

        student = get_object_or_404(Student, id=student_id)

        if semester == 1:
            data_inicio = date(year, 1, 1)
            data_fim = date(year, 6, 30)
        else:
            data_inicio = date(year, 7, 1)
            data_fim = date(year, 12, 31)

        relations = AuxilioRelation.objects.filter(
            student=student,
            dataSolicitacao__range=(data_inicio, data_fim)
        )

        try:
            serializer = AuxilioRelationSerializer(relations[0])
            return Response(serializer.data, status=status.HTTP_200_OK)
        except IndexError:
            raise NotFound("Aluno não solicoitou auxílios") 
        
        
class SolicitarAuxilioAPIView(APIView):
    """
    Endpoint que permite solicitar auxílios para um aluno em um ano/semestre específico.
    """
    @swagger_auto_schema(
        operation_description="Endpoint que permite solicitar auxílios para um aluno em um ano/semestre específico.",
        request_body=SolicitarAuxilioSerializer,
    )
    def post(self, request):
        serializer = SolicitarAuxilioSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data

        student_id = data["student_id"]
        ano = data["ano"]
        semestre = data["semestre"]
        tipos = [data["tipo1"], data["tipo2"], data["tipo3"]]

        student = Student.objects.filter(id=student_id).first()
        if not student:
            raise NotFound("Aluno não encontrado.")

        # Define mês de referência para o semestre
        meses = range(1, 7) if semestre == 1 else range(7, 13)

        auxilio_relation = AuxilioRelation.objects.filter(
            student=student,
            dataSolicitacao__year=ano,
            dataSolicitacao__month__in=meses
        ).first()

        def criar_ou_atualizar_auxilio(auxilio, novo_tipo):
            if auxilio and auxilio.status == "AGUARDANDO ANÁLISE":
                return auxilio  # não pode alterar
            if auxilio:
                auxilio._type = novo_tipo
                auxilio.status = "AGUARDANDO ANÁLISE"
                auxilio.save()
                return auxilio
            return Auxilio.objects.create(_type=novo_tipo)

        if auxilio_relation:
            if(tipos[0]):
                aux1 = criar_ou_atualizar_auxilio(auxilio_relation.auxilio1, tipos[0])
                auxilio_relation.auxilio1 = aux1
            if(tipos[1]):
                aux2 = criar_ou_atualizar_auxilio(auxilio_relation.auxilio2, tipos[1])
                auxilio_relation.auxilio2 = aux2
            if(tipos[2]):
                aux3 = criar_ou_atualizar_auxilio(auxilio_relation.auxilio3, tipos[2])
                auxilio_relation.auxilio3 = aux3
            auxilio_relation.save()
        else:
            aux1 = Auxilio.objects.create(_type=tipos[0])
            aux2 = Auxilio.objects.create(_type=tipos[1])
            aux3 = Auxilio.objects.create(_type=tipos[2])
            auxilio_relation = AuxilioRelation.objects.create(
                dataSolicitacao=datetime(ano, 1 if semestre == 1 else 7, 1),
                student=student,
                auxilio1=aux1,
                auxilio2=aux2,
                auxilio3=aux3
            )

        return Response({}, status=status.HTTP_200_OK)
        
        
        
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer