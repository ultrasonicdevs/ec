from django.urls import path
from .views import *

urlpatterns = [
    path('', MainView.as_view(), name='main'),
    path('<str:type_id>/', ProductsView.as_view(), name='product_list'),
    path('<str:type_id>/<str:product_id>/', ProductDetailView.as_view(), name='product_detail'),
]
