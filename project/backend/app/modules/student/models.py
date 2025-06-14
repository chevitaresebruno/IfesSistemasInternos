from django.db import models
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
            
    def getPhones(self) -> list[str]:
        return [phone.getComplete() for phone in self.phone.all()]

    def getEmails(self) -> list[str]:
        return [email.mail for email in self.email.all()]

class Student(Person):
    ingresseDate = models.DateField()
    semester = models.IntegerField()
    matrCode = models.CharField(max_length=10)
    status = models.ForeignKey(StatusAcademic, on_delete=models.PROTECT)
    course = models.ForeignKey(Course, on_delete=models.PROTECT)
    
    def getMatricule(self) -> str:
        return f"{self.ingresseDate.year}{self.semester.value}{self.course.abr}{self.matrCode}"
    
    def getStatus(self) -> str:
        return self.status.name
    
    def getCourse(self) -> str:
        return self.course.name
    
    