from django.urls import path
from .views import UserAdminView, UserAdminViewTest

urlpatterns = [
    path('', UserAdminView.as_view(), name='user_admin'),
    path('tests/', UserAdminViewTest.as_view(), name='user_admin_tests'),
]
