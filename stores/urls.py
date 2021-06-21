from django.urls import path
from stores.views import *
from django.contrib import admin
from django.urls import include



urlpatterns = [
    path('store/', view_store, name="view_store"),
]
