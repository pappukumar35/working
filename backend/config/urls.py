from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('campaigns.urls')),  # ✅ API routes from campaigns app
    path('', lambda request: HttpResponse("<h2>✅ Django API is running!</h2>")),  # ✅ Root response
]
