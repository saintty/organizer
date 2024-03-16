from django.contrib import admin
from django.urls import path, include



api_urls = [
    path('', include('authentication.urls', namespace='authentication')),
    path('event/', include('event.urls')),

]



urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include(api_urls))
]
