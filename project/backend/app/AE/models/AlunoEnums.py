from django.db import models


TURNOS_CHOICES = [
    ("matutino", "Matutino"),
    ("vespertino", "Vespertino"),
    ("noturno", "Noturno"),
    ("integral", "Integral"),
]


SITUACAO_CHOICES= [
    ("matriculado", "Matriculado"),
    ("aguardando colacao", "Aguardando Colação"),
    ("transferido interno", "Transferido Interno"),
    ("transferido externo", "Transferido Externo"),
    ("formado", "Formado"),
    ("cancelamento compulsório", "Cancelamento Compulsório"),
    ("aguardando solicitar certificacao", "Aguardando Solicitar Certificação"),
]


class EtniaModel(models.Model):
    nome = models.CharField(max_length=50)

