from django.db import models

from .BancoModel import BancoModel
from .DadosBancariosEnum import *


class DadosBancariosModels(models.Model):
    banco = models.ForeignKey(BancoModel, on_delete=models.PROTECT)
    agencia = models.IntegerField()
    conta = models.IntegerField()
    tipoConta = models.CharField(max_length=50, choices=TIPO_CONTA_CHOICES)