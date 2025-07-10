from django.db import models
from django.contrib.auth.models import User
from cpf_field.models import CPFField

# Base Models

class Phone(models.Model):
    ddd = models.IntegerField()
    numero = models.IntegerField()
    
    def getComplete(self) -> str:
        return f"{self.ddd}{self.numero}"
    
    def getMasked(self) -> str:
        return f"({self.ddd}) {self.numero}"
    
class Email(models.Model):
    mail = models.EmailField()
    
class Bank(models.Model):
    name = models.CharField(max_length=20)
    
class BankAccountType(models.Model):
    texto = models.CharField(max_length=50)
    
class Course(models.Model):
    abr = models.CharField(max_length=10)
    name = models.CharField(max_length=80)
    
class StatusAcademic(models.Model):
    name = models.CharField(max_length=50)

# Complex Models

class Person(models.Model):
    name = models.CharField(max_length=80)
    cpf = CPFField('cpf')
    bornDate = models.DateField()
    phone = models.ManyToManyField(Phone, related_name="persons") # gambiarra para poder acessar telefones por Pessoa de formas mais simples
    email = models.ManyToManyField(Email, related_name="persons")
    
    def delete(self, *args, **kwargs):
        phones = self.phone.all()
        for phone in phones:
            if phone.persons.count() == 0: phone.delete()
        mails = self.email.all()
        for mail in mails:
            if mails.persons.count() == 0: mail.delete()
            
        super().delete(args, kwargs)
            
    def getPhones(self) -> list[str]:
        return [phone.getComplete() for phone in self.phone.all()]

    def getEmails(self) -> list[str]:
        return [email.mail for email in self.email.all()]

class Student(Person):
    ingresseDate = models.DateField()
    semester = models.IntegerField()
    matrCode = models.CharField(max_length=10)
    status = models.ForeignKey(StatusAcademic, on_delete=models.PROTECT, null=True, blank=True)
    course = models.ForeignKey(Course, on_delete=models.PROTECT)
    user = models.OneToOneField(User, null=True, blank=True, on_delete=models.CASCADE)
    
    def getMatricule(self) -> str:
        return f"{self.ingresseDate.year}{self.semester}{self.course.abr}{self.matrCode}"
    
    def getStatus(self) -> str:
        if(self.status == None):
            return "indefinido"
        return self.status.name
    
    def getCourse(self) -> str:
        return self.course.name


# Seção de Auxilios
class AuxiolioTypeOptions(models.Choices):
    "ALIMENTAÇÃO",
    "UNIFORME",
    "MORADIA",
    
class AuxilioStatusOptions(models.Choices):
    "AGUARDANDO ANÁLISE",
    "APROVADO",
    "REPROVADO"
        
        
class Auxilio(models.Model):
    _type = models.CharField(max_length=50, choices=AuxiolioTypeOptions)
    status= models.CharField(max_length=20, choices=AuxilioStatusOptions, default="AGUARDANDO ANÁLISE")
    
    
class AuxilioRelation(models.Model):
    dataSolicitacao = models.DateField()
    auxilio1 = models.ForeignKey(Auxilio, null=True, blank=True, on_delete=models.CASCADE, related_name="auxilio1")    
    auxilio2 = models.ForeignKey(Auxilio, null=True, blank=True, on_delete=models.CASCADE, related_name="auxilio2")    
    auxilio3 = models.ForeignKey(Auxilio, null=True, blank=True, on_delete=models.CASCADE, related_name="auxilio3")
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
        
    