from django.shortcuts import render
from django.views import View

# Create your views here.


class UserAdminView(View):
    @staticmethod
    def get(request):
        return render(request, 'user_side/base.html', {'title': 'EasyCompare Admin'})
