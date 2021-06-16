from django.urls import path
from users.views import *


urlpatterns = [
    path('uprofile/edit/', edit_profile, name="edit_user_profile"),
    path('uprofile/', view_profile, name="user_profile"),
    path('ustores/', view_stores, name="user_stores"),
    path('ustores/createstore/', create_store, name="create_store"),
]
