from django.urls import path
from .views import UserAdminView, UserAdminViewTest

urlpatterns = [
    path('', UserAdminView.as_view(), name='user_admin'),
]
