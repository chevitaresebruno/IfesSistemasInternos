from django.db import models

from .EstadoModel import EstadoModel


class EnderecoModel(models.Model):
    numero = models.IntegerField()
    complemento = models.CharField(max_length=80)
    cep = models.IntegerField()
    cidade = models.CharField(max_length=80)
    estado = models.ForeignKey(EstadoModel, on_delete=models.PROTECT)

