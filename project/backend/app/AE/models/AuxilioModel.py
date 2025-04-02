from django.db import models


class AuxilioModel(models.Model):
    dataPleiteado = models.DateField()
    dataConcedido = models.DateField()

