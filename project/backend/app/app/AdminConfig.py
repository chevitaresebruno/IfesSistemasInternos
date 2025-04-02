from django.contrib import admin

from AE.models.AlunoModel import AlunoModel


admin.site.register(AlunoModel)

AdminUrls = admin.site.urls

