from rest_framework import serializers

from .models import Event
from authentication.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "name", "email")


class EventSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Event
        fields = "__all__"
        # fields = ("id", "user", "title", "description", "start_time", "end_time", "priority")
