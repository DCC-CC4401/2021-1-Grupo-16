from django.urls import path
from users.views import *

urlpatterns = [
    path('uprofile/edit/', edit_uprofile, name='edit_user_profile'),
    path('uprofile/', view_uprofile, name='user_profile'),
    path('ustores/', view_ustores, name='user_stores'),
    path('ustores/createstore/', create_ustore, name='create_user_store'),
]
