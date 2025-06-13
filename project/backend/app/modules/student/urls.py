from django.urls import path, include
from rest_framework import routers
from .apiViews import *

router = routers.DefaultRouter()
router.register(r'phone', PhoneViewSet)
router.register(r'email', EmailViewSet)
router.register(r'bank', BankViewSet)
router.register(r'banktype', BankAccountTypeViewSet)
router.register(r'course', CourseViewSet)
router.register(r'student', StudentViewSet)

# URLs do app (API + Swagger)
urlpatterns = [
    path('', include(router.urls)),
    path('student/new/', StudentCreateApiView.as_view(), name='student_create')
]
