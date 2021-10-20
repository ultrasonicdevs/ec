from django.contrib import admin
from django.urls import path
from . import views


urlpatterns = [
    path('', views.sections_list),
<<<<<<< HEAD
    path('<str:section_name>', views.section, name='section_objects')
=======
    path('<str:section_name>', views.section, name="section_detail")
>>>>>>> 708c9995f2f5d5081d7a8cb48e321a94a9e00d75
]
