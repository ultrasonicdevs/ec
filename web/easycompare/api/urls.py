from unicodedata import name
from django.urls import path
from api import views

app_name = 'api'
urlpatterns = [
    path('', views.index, name='index'),
    path('sections/', views.sections, name='sections'),
    path('sections/<str:section_id>/', views.section_detail, name='section-detail'),
    path('sections/<str:section_id>/product-types/', views.section_product_types, name='section-detail'),
    path('product-types/', views.product_types, name='product-types'),
    path('product-types/<str:type_id>/', views.product_type_detail, name='product_type_detail'),
    path('product-types/<str:type_id>/filters/', views.product_type_filters, name='product_type_filters'),
    path('product-types/<str:type_id>/products/', views.products_of_certain_type, name='products-of-certain-type'),
    path('product-types/<str:type_id>/get-filtered/', views.product_type_get_filtered, name='product_type_get_filtered'),
    path('products/', views.products, name='products'),
    path('products/<str:product_id>/', views.product_detail, name='product_detail'),
    path('images/', views.images, name='images'),
]