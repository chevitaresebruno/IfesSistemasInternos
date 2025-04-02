from django.db import models


class TipoEscolaModel(models.Model):
    nome = models.CharField(max_length=80)
    ativo = models.BooleanField()

    