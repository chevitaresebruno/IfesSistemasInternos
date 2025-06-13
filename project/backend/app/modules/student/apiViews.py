from rest_framework.viewsets import ModelViewSet
from .models import *
from .serializers import *


class PhoneViewSet(ModelViewSet):
    queryset = Phone.objects.all()
    serializer_class = PhoneSerializer
    
class EmailViewSet(ModelViewSet):
    queryset = Email.objects.all()
    serializer_class = EmailSerializer
    
class BankViewSet(ModelViewSet):
    queryset = Bank.objects.all()
    serializer_class = BankSerializer
    
class BankAccountTypeViewSet(ModelViewSet):
    queryset = BankAccountType.objects.all()
    serializer_class = BankAccountTypeSerializer
    
class CourseViewSet(ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer 
    
class StatusAcademicViewSet(ModelViewSet):
    queryset = StatusAcademic.objects.all()
    serializer_class = StatusAcademicSerializer
    
"""
class StudentCreateApiView(serializers.ViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentCreateSerializer
"""

class StudentViewSet(ModelViewSet):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    
    
