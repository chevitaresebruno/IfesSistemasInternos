from django.urls import path, include
from rest_framework import routers
from .apiViews import *

router = routers.DefaultRouter()
router.register(r'phone', PhoneViewSet)
router.register(r'email', EmailViewSet)
router.register(r'bank', BankViewSet)
router.register(r'banktype', BankAccountTypeViewSet)
router.register(r'course', CourseViewSet)
router.register(r'academicStatus', StatusAcademicViewSet)
router.register(r'student', StudentViewSet)
router.register(r'auxilio', AuxilioRelationViewSet)

# URLs do app (API + Swagger)
urlpatterns = [
    path('student/new/', StudentCreateApiView.as_view()),
    path('auxilio/getAuxilioFromAluno/<int:student_id>/<int:year>/<int:semester>', GetAuxilioFromAluno.as_view(), name='get_auxilio_from_aluno'),
    path('auxilio/solicitar/', SolicitarAuxilioAPIView.as_view(), name='auxilio_solicitar'),
    path('login/', CustomTokenObtainPairView.as_view(), name='custom_token_obtain_pair'),
    path('', include(router.urls)),
]
