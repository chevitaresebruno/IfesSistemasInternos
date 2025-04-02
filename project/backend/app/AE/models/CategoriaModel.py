from django.db import models


class CategoriaModel(models.Model):
    descricao = models.CharField(max_length=250)