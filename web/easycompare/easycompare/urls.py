from django.contrib import admin
from django.urls import path
from django.urls.conf import include
from django.conf.urls.static import static
from django.conf import settings
from easycompare.settings import DEBUG

urlpatterns = [
    path('jet/', include('jet.urls')),
    path('django-admin/', admin.site.urls),
    path('ec-admin/', include('ec_admin.urls')),
    path('api/', include('api.urls')),
    path('user_admin/', include('user_admin.urls')),
    path('', include('user_side.urls')),
]

if DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
