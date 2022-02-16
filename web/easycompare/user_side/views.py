from django.shortcuts import render
from django.views import View


class MainView(View):
    @staticmethod
    def get(request):
        return render(request, 'user_side/main_page.html')
