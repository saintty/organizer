from rest_framework import serializers

from authentication.serializers import UserSerializer
from .models import Event


class EventSerializer(serializers.ModelSerializer):

    class Meta:
        user = UserSerializer()
        model = Event
        fields = "__all__"
        # fields = ("id", "user", "title", "description", "start_time", "end_time", "priority")
