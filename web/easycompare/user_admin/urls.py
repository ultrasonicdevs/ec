from django.urls import path
from .views import UserAdminView, UserAdminViewTest

urlpatterns = [
    path('', UserAdminView.as_view(), name='user_admin'),
    path('test/', UserAdminViewTest.as_view(), name='user_admin_test_form')
]
