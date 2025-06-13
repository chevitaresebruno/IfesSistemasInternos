from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

# Configurar o Swagger
schema_view = get_schema_view(
   openapi.Info(
      title="API Student",
      default_version='v1',
      description="Documentação da API de alunos",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="contato@exemplo.com"),
      license=openapi.License(name="MIT License"),
   ),
   public=True,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('modules.student.urls')),  # Inclui as URLs da app student
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
]
