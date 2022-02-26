from unicodedata import name
from django.urls import path
from api import views

app_name = 'api'
urlpatterns = [
    path('', views.index, name='index'),
    path('sections/', views.sections, name='sections'),
    path('sections/<str:section_id>/', views.section_detail, name='section-detail'),
    path('sections/<str:section_id>/product-types/', views.section_product_types, name='section-detail'),
]