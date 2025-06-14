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
    phone = PhoneSerializer(many=True)
    email = EmailSerializer(many=True)
    
    class Meta:
        model = Student
        fields = '__all__'
                
    def create(self, validated_data) -> Student:
        phones = validated_data.pop("phone")
        emails = validated_data.pop("email")
        student = Student.objects.create(**validated_data)
    
        for phone_data in phones:        
            phone = Phone.objects.create(**phone_data)
            student.phone.add(phone)
        
        for email_data in emails:
            email = Email.objects.create(**email_data)
            student.email.add(email)
        
        return student

class StudentSerializer(serializers.ModelSerializer):
    status = serializers.SerializerMethodField()
    course = serializers.SerializerMethodField()
    
    class Meta:
        model = Student
        fields = '__all__'
    
    def get_status(self, obj: Student):
        return obj.getStatus()
    
    def get_course(self, obj: Student):
        return obj.getCourse()
    
    
