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


class FilterPanel(View):
    @staticmethod
    def get(request):
        return render(request, 'user_side/filter_patterns.html', {'title': 'Шаблоны фильтров'})
