from django.db import models


from .ResponsavelEnums import *


class ResponsavelModel(models.Model):
    nome = models.CharField(max_length=80)
    telefone = models.IntegerField()
    tipo = models.CharField(max_length=50, choices=TIPO_CHOICES)

    