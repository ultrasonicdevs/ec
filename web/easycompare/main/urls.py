from django.contrib import admin
from django.urls import path
from . import views

app_name = 'main'
urlpatterns = [
    path('', views.base),
    path('section', views.sections_list),
    path('<str:section_name>', views.section, name="section_detail"),
]
