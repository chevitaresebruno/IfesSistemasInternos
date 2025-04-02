from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import action

from AE.serealizers.AlunoSerializer import AlunoSerializer, AlunoSerializerList
from AE.models.AlunoModel import AlunoModel


class AlunoViewset(viewsets.ModelViewSet):
    queryset = AlunoModel.objects.all()
    serializer_class = AlunoSerializer
    

class AlunoApiview(APIView):
    def get(self, request, format=None):
        alunos = AlunoModel.objects.all()
        serializer = AlunoSerializerList(alunos)
        return Response(serializer.data)
    
    