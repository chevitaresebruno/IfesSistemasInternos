from rest_framework import serializers

from AE.models.AlunoModel import AlunoModel
from .MatriculaSerializer import MatriculaSerializerRead


class AlunoSerializer(serializers.Serializer):
    class Meta:
        model = AlunoModel
        fields = "__all__"

class AlunoSerializerList(serializers.ModelSerializer):
    matricula = MatriculaSerializerRead()

    class Meta:
        model = AlunoModel
        fields = ["id", "nome", "telefone", "matricula"]

        