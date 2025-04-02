from django.urls import path, include

from .AdminConfig import AdminUrls
from .SwaggerConfig import SwaggerUrls


urlpatterns = [
    path('admin/', AdminUrls),
    path('', include(SwaggerUrls))
]

