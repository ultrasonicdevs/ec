from django.shortcuts import render
from django.views import View


class MainView(View):
    @staticmethod
    def get(request):
        return render(request, 'user_side/main_page.html', {'title': 'Главная'})


class ProductsView(View):
    @staticmethod
    def get(request, type_id):
        return render(request, 'user_side/products.html')


class ProductDetailView(View):
    @staticmethod
    def get(request, type_id, product_id):
        return render(request, 'user_side/product_detail.html')
