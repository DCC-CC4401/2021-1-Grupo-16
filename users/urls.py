from django.urls import path
from users.views import view_profile

urlpatterns = [
    path('uprofile/', view_profile, name="user_profile"),
]
