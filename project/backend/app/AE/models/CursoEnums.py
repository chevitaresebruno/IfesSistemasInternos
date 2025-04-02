from django.db import models


NIVEL_ENSINO_CHOICES = [
    ("mestrado", "Mestrado"),
    ("pós graduação", "Pós Graduação"),
    ("superior", "Superior"),
    ("médio", "Médio"),
    ("técnico", "Técnico"),
    ("fundamental", "Fundamental"),
    ("tecnologo", "Tecnólogo"),
]



class CursoModalidadeModel(models.Model):
    nome = models.CharField(max_length=50)
    ativo = models.BooleanField()
    
