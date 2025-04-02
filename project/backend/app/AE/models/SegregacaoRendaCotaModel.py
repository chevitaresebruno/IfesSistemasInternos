from django.db import models


class SegregacaoRendaCotaModel(models.Model):
    unidadesSalarioPercapta = models.DecimalField(max_digits=12, decimal_places=2)
    ativo = models.BooleanField()

    