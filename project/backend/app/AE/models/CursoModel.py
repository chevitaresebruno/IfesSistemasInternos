from django.db import models

from .CursoEnums import *


class CursoModel(models.Model):
    nome = models.CharField(max_length=80)
    sigla = models.CharField(max_length=20)
    modalidade = models.ForeignKey(CursoModalidadeModel, on_delete=models.PROTECT)
    nivelEnsino = models.CharField(max_length=50, choices=NIVEL_ENSINO_CHOICES)
    ativo = models.BooleanField()

