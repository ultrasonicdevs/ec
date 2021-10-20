from django.contrib import admin
from django.urls import path
from . import views


urlpatterns = [
    path('', views.sections_list),
    path('<str:section_name>', views.section, name='section_objects')
]
