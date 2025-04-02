from django.urls import path, include
from rest_framework import routers

from .apiviews.AlunoViews import AlunoApiview


# router = routers.DefaultRouter()
# router.register(r'aluno', AlunoApiview.as_view(), basename="aluno")


assistenciaEstudantilUrls = [
   path("aluno/", AlunoApiview.as_view(), name="aluno"),
   #path("", include(router.urls))
]

