from django.db import models

from .CursoModel import CursoModel


class MatriculaModel(models.Model):
    ano = models.IntegerField()
    periodo = models.IntegerField()
    hash = models.IntegerField()
    curso = models.ForeignKey(CursoModel, on_delete=models.PROTECT)
    
