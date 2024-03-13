from django.urls import path

from event.views import EventListCreateAPIView, EventDetailAPIView

app_name = 'event'



urlpatterns = [
    path('', EventListCreateAPIView.as_view(), name="list"),
    path('<int:pk>/', EventDetailAPIView.as_view(), name="detail"),
]