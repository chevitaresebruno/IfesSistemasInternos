from django.db import models


class CondicaoFisicaMentalModel(models.Model):
    descricao = models.CharField(max_length=255)

    