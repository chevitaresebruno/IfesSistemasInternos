from rest_framework import serializers
from .models import *
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

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
        exclude = ["status"]

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


class StudentReadSerializer(serializers.ModelSerializer):
    status = serializers.SerializerMethodField()
    course = CourseSerializer()
    phone = serializers.SerializerMethodField()
    email = serializers.SerializerMethodField()
    matricula = serializers.SerializerMethodField()
    
    class Meta:
        model = Student
        exclude = ['matrCode']
    
    def get_status(self, obj: Student):
        return obj.getStatus()
    
    def get_phone(self, obj: Student):
        return obj.getPhones()
    
    def get_email(self, obj: Student):
        return obj.getEmails()
    
    def get_matricula(self, obj: Student):
        return obj.getMatricule()
    
class StudentWriteSerializer(serializers.ModelSerializer):
    course = serializers.PrimaryKeyRelatedField(queryset=Course.objects.all(), allow_null=False, required=False)
    phone = serializers.PrimaryKeyRelatedField(queryset=Phone.objects.all(), many=True)
    email = serializers.PrimaryKeyRelatedField(queryset=Email.objects.all(), many=True)
    class Meta:
        model = Student
        exclude = ["status"]    

class AuxilioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Auxilio
        fields = "__all__"
        
        
class AuxilioRelationSerializer(serializers.ModelSerializer):
    auxilio1 = AuxilioSerializer()
    auxilio2 = AuxilioSerializer()
    auxilio3 = AuxilioSerializer()
    
    class Meta:
        model = AuxilioRelation
        fields = '__all__'

    def update(self, instance, validated_data):
        auxilio1_data = validated_data.pop('auxilio1', None)
        auxilio2_data = validated_data.pop('auxilio2', None)
        auxilio3_data = validated_data.pop('auxilio3', None)

        # Atualiza os auxílios, se vierem
        if auxilio1_data:
            for attr, value in auxilio1_data.items():
                setattr(instance.auxilio1, attr, value)
            instance.auxilio1.save()

        if auxilio2_data:
            for attr, value in auxilio2_data.items():
                setattr(instance.auxilio2, attr, value)
            instance.auxilio2.save()

        if auxilio3_data:
            for attr, value in auxilio3_data.items():
                setattr(instance.auxilio3, attr, value)
            instance.auxilio3.save()

        # Atualiza campos diretos do AuxilioRelation
        for attr, value in validated_data.items():
            setattr(instance, attr, value)

        instance.save()
        return instance

        
class AuxilioSerializer(serializers.ModelSerializer):
    auxilio1 = AuxilioSerializer()
    auxilio2 = AuxilioSerializer()
    auxilio3 = AuxilioSerializer()
    
    class Meta:
        model = Auxilio
        fields = '__all__'


class SolicitarAuxilioSerializer(serializers.Serializer):
    student_id = serializers.IntegerField()
    ano = serializers.IntegerField()
    semestre = serializers.IntegerField()
    tipo1 = serializers.CharField(allow_blank=True)
    tipo2 = serializers.CharField(allow_blank=True)
    tipo3 = serializers.CharField(allow_blank=True)
    
    
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        # Adiciona dados do usuário ao response
        try:
            student = Student.objects.filter(user=self.user)[0].pk
        except Exception:
            student = 0
            
        data['user'] = {
            'id': self.user.id,
            'student': student
        }

        return data