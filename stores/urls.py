from django.urls import path
from stores.views import *
from django.contrib import admin
from django.urls import include

path('store/', view_store, name="view_store"),
path('sprofile/<int:store_index>/', view_sprofile, name="store_profile"),
path('sprofile/edit/<int:store_index>/', edit_sprofile, name="store_profile"),
path('sinventory/<int:store_index>/', view_sinventory, name ="store_inventory"),
path('sinventory/addproduct/<int:store_index>/', add_product, name ="add_product")
