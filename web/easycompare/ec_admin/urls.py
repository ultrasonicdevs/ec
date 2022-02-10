from unicodedata import name
from django.contrib import admin
from django.urls import path
from ec_admin import views

app_name = 'ec_admin'
urlpatterns = [
    path('', views.index, name='index'),
    path('add-section/', views.section, name='add_section'),
    path('add-section/processing/', views.section_submit),
    path('add-section/get-parent-sections/', views.get_parent_sections),
    path('add-product-type/', views.product_type, name='add_product_type'),
    path('add-product-type/processing/', views.product_type_submit),
    path('add-product-type/get-parent-sections/', views.get_parent_sections),
]
