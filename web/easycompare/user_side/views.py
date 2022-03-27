from django.shortcuts import render
from django.views import View


class MainView(View):
    @staticmethod
    def get(request):
        return render(request, 'user_side/main_page.html', {'title': 'Главная'})


class ProductCardView(View):
    @staticmethod
    def get(request):
        return render(request, 'user_side/product_card.html', {'title': 'Шаблон карточки'})


class ProductsView(View):
    @staticmethod
    def get(request, type_id):
        return render(request, 'user_side/products.html', {'title': 'Product type name'})
