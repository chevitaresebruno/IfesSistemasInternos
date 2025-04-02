from django.db import models

from .TipoEscolaModel import TipoEscolaModel


class CotaModel(models.Model):
    tipoEscola = models.ForeignKey(TipoEscolaModel, on_delete=models.PROTECT)

    