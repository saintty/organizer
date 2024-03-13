
from rest_framework.serializers import ModelSerializer
from models import User
 
class UserSerializer(ModelSerializer):
     
    class Meta:
        model = User
        fields = ["url", "name", "email", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User(username = validated_data["name"], email = validated_data["email"])
        user.set_password(validated_data["password"])
        user.save()
        return user