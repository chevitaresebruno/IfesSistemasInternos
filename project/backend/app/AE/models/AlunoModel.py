from django.db import models

from .AlunoEnums import *
from .GFModel import GFModel
from .CotaModel import CotaModel
from .AuxilioModel import AuxilioModel
from .EnderecoModel import EnderecoModel
from .MatriculaModel import MatriculaModel
from .CategoriaModel import CategoriaModel
from .ResponsavelModel import ResponsavelModel
from .DadosBancariosModel import DadosBancariosModels
from .CondicaoFisicaMentalModel import CondicaoFisicaMentalModel


class AlunoModel(models.Model):
    nome = models.CharField(max_length=80)
    cpf = models.IntegerField()
    telefone = models.IntegerField()
    email = models.CharField(max_length=80)
    ivs = models.IntegerField()
    rendaPercapta = models.DecimalField(max_digits=12, decimal_places=2)
    dataNascimento = models.DateField()
    turno = models.CharField(max_length=80, choices=TURNOS_CHOICES)
    situacao = models.CharField(max_length=50, choices=SITUACAO_CHOICES)
    etnia = models.ForeignKey(EtniaModel, on_delete=models.PROTECT)
    matricula = models.ForeignKey(MatriculaModel, on_delete=models.PROTECT, null=True)
    cota = models.ForeignKey(CotaModel, on_delete=models.PROTECT)
    auxilio = models.ForeignKey(AuxilioModel, on_delete=models.PROTECT)
    categoria = models.ForeignKey(CategoriaModel, on_delete=models.PROTECT)
    responsavel = models.ForeignKey(ResponsavelModel, on_delete=models.PROTECT)
    endereco = models.ForeignKey(EnderecoModel, on_delete=models.PROTECT)
    gf = models.ForeignKey(GFModel, on_delete=models.PROTECT)
    condicaoFisicaMental = models.ForeignKey(CondicaoFisicaMentalModel, on_delete=models.PROTECT)
    dadosBancarios = models.ForeignKey(DadosBancariosModels, on_delete=models.PROTECT)

    def __str__(self):
        return self.nome
    
