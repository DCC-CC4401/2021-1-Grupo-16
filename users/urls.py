from django.urls import path
from users.views import view_profile

urlpatterns = [
    path('user_profile', view_profile),
]
