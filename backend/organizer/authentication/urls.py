from django.urls import path
from .views import LoginAPIView, RegistrationAPIView, UserRetrieveUpdateAPIView
app_name = 'authentication'

urlpatterns = [
    path('registration/', RegistrationAPIView.as_view()),
    path('login/', LoginAPIView.as_view()),
    path('user/', UserRetrieveUpdateAPIView.as_view()),
]