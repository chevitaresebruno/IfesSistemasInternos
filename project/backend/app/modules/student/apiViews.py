from rest_framework.viewsets import ModelViewSet
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework.authentication import TokenAuthentication
from rest_framework import status
from drf_yasg.utils import swagger_auto_schema
from .models import *
from .serializers import *


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
            student = serializer.save()
            
            return Response(StudentCreateSerializer(student).data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class StudentViewSet(ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    
    
