from django.contrib import admin
from django.urls import path
from . import views


urlpatterns = [
    path('', views.sections_list),
    path('section', views.section)
]
