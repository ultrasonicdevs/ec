from django.urls import path
from .views import *

urlpatterns = [
    path('', MainView.as_view(), name='main'),
    path('product/', ProductCardView.as_view(), name='product_card'),
    path('filter/', FilterPanel.as_view(), name='filter_pattern'),
]
