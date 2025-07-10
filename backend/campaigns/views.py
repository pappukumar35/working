from rest_framework import generics, viewsets, permissions
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.conf import settings
from .models import Campaign, Donation
from .serializers import RegisterSerializer, CampaignSerializer, DonationSerializer
import stripe

# -----------------------------------
# 🔹 User Registration View
# -----------------------------------
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]


# -----------------------------------
# 🔹 Campaign CRUD ViewSet
# -----------------------------------
class CampaignViewSet(viewsets.ModelViewSet):
    queryset = Campaign.objects.all().order_by('-created_at')
    serializer_class = CampaignSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]


# -----------------------------------
# 🔹 Donation Create API
# -----------------------------------
class DonationCreateView(generics.CreateAPIView):
    queryset = Donation.objects.all()
    serializer_class = DonationSerializer
    permission_classes = [IsAuthenticated]


# -----------------------------------
# 🔹 Stripe Checkout API View
# -----------------------------------
stripe.api_key = settings.STRIPE_SECRET_KEY

class StripeCheckoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            campaign_id = request.data.get("campaign_id")
            amount = float(request.data.get("amount"))
            campaign = Campaign.objects.get(id=campaign_id)

            stripe_amount = int(amount * 100)  # Convert ₹ to paisa

            session = stripe.checkout.Session.create(
                payment_method_types=["card"],
                line_items=[{
                    "price_data": {
                        "currency": "inr",
                        "product_data": {
                            "name": campaign.title,
                        },
                        "unit_amount": stripe_amount,
                    },
                    "quantity": 1,
                }],
                mode="payment",
                success_url="http://localhost:3000/success",
                cancel_url="http://localhost:3000/cancel",
            )

            return Response({"id": session.id})
        except Exception as e:
            return Response({"error": str(e)}, status=500)
