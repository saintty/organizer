from rest_framework.authentication import SessionAuthentication, TokenAuthentication
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated

from .models import Event

from .permission import UserIsOwnerEvent
from .serializer import EventSerializer


class EventListCreateAPIView(ListCreateAPIView):
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated, UserIsOwnerEvent]
    # authentication_classes = [SessionAuthentication, TokenAuthentication]

    def get_queryset(self):
        return Event.objects.filter(user=self.request.user.id)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class EventDetailAPIView(RetrieveUpdateDestroyAPIView):
    serializer_class = EventSerializer
    permission_classes = [IsAuthenticated, UserIsOwnerEvent]
    # authentication_classes = [SessionAuthentication, TokenAuthentication]

    queryset = Event.objects.all()
