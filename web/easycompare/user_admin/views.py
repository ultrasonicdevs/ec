from django.shortcuts import render
from django.views import View


class UserAdminView(View):
    @staticmethod
    def get(request):
        return render(request, 'user_admin/user_admin_page.html')
