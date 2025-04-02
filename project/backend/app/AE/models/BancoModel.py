from django.db import models


class BancoModel(models.Model):
    nome = models.CharField(max_length=80)

    