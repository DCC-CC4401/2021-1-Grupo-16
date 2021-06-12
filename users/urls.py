from django.urls import path
from users.views import view_profile
from users.views import edit_profile

urlpatterns = [
    path('uprofile/edit/', edit_profile, name="edit_profile"),
    path('uprofile/', view_profile, name="user_profile"),
]
