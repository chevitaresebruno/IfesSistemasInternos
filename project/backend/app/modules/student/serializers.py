from rest_framework import serializers
from .models import *


class PhoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Phone
        fields = '__all__'
    
class EmailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Email
        fields = '__all__'
    
class BankSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bank
        fields = '__all__'
    
class BankAccountTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = BankAccountType
        fields = '__all__'
    
class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'
    
class StatusAcademicSerializer(serializers.ModelSerializer):
    class Meta:
        model = StatusAcademic
        fields = '__all__'
    
class StudentCreateSerializer(serializers.ModelSerializer):
    phone = serializers.CharField()
    email = serializers.EmailField()
    
    class Meta:
        model = Student
        exclude = []
        
    def create(self, validated_data) -> Student:
        phone = validated_data.pop("phone")
        email = validated_data.pop("email")
        
        phone, _ = Phone.objects.create(ddd=phone[:2], numero=phone[2:])
        email, _ = Email.objects.create(mail=email)
        
        return Student.objects.create(phone=phone, email=email, **validated_data)

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'
    
    
