from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import RegisterView, CampaignViewSet, DonationCreateView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import DonationCreateView
from .views import StripeCheckoutView
# Registering the CampaignViewSet with a router
router = DefaultRouter()
router.register(r'campaigns', CampaignViewSet, basename='campaign')

# Final URL patterns
urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('donate/', DonationCreateView.as_view(), name='donate'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('', include(router.urls)),  # Include all router URLs
    path('create-checkout-session/', StripeCheckoutView.as_view(), name='stripe_checkout'),
]
