from unicodedata import name
from django.contrib import admin
from django.urls import path
from ec_admin import views

app_name = 'ec_admin'
urlpatterns = [
    path('', views.section, name='add_section'),
    path('add-product-type/', views.product_type, name='add_product_type'),
    path('add-product-type/processing/', views.json_processing, name='type_json_processing'),
]
