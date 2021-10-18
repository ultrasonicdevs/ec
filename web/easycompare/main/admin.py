from django.contrib import admin
from .models import *


class ObjectAttributeInline(admin.TabularInline):
    model = ObjectAttribute

class ObjectAdmin(admin.ModelAdmin):
    inlines = [ObjectAttributeInline]

admin.site.register(SectionFilter)
admin.site.register(Section)
admin.site.register(Object, ObjectAdmin)
admin.site.register(ObjectAttribute)