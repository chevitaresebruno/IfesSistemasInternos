from django.db import models

from .EnderecoModel import EnderecoModel


class GFModel(models.Model):
    numero = models.CharField(max_length=255)
    endereco = models.ForeignKey(EnderecoModel, on_delete=models.PROTECT)

    