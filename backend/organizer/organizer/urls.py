from django.contrib import admin
from django.urls import path, include


api_urls = [
    path('event/', include('event.urls')),
    path('users/', include('user.urls')),
]

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include(api_urls))

]
