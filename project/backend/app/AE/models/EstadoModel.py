from django.db import models


class EstadoModel(models.Model):
    nome = models.CharField(max_length=80)
    sigla = models.CharField(max_length=5)

