from django.contrib import admin

from .models import * 


admin.site.register(Student)
admin.site.register(Auxilio)
admin.site.register(AuxilioRelation)
admin.site.register(StatusAcademic)
admin.site.register(Course)
admin.site.register(Phone)
admin.site.register(Email)
admin.site.register(Bank)
admin.site.register(BankAccountType)

