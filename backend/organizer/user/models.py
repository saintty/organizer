from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    name = models.CharField(max_length=10, null=False, blank=False)
    email = models.EmailField(null=False, blank=False, unique=True, primary_key=True)
    password = models.CharField(max_length=32, null=False, blank=False)
