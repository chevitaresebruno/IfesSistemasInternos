from rest_framework import serializers

from AE.models.MatriculaModel import MatriculaModel


class MatriculaSerializerRead(serializers.ModelSerializer):
    class Meta:
        model = MatriculaModel
        fields = "__all__"

        