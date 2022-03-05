from django.urls import path
from .views import UserAdminView

urlpatterns = [
    path('', UserAdminView.as_view(), name='user_admin'),
]
