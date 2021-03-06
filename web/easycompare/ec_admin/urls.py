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
    path('add-product/', views.product, name='add_product'),
    path('add-product/processing/', views.product_submit),
    path('add-product/get-types/', views.get_product_types),
    path('add-product/get-type-attributes/', views.get_type_attributes),
    path('facets/', views.facets, name='facets'),
]
