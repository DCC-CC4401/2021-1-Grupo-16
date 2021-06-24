from django.urls import path
from stores.views import *

urlpatterns = [
    path('store/<int:store_index>', view_store, name='view_store'),
    path('sprofile/<int:store_index>/', view_sprofile, name='store_profile'),
    path('sprofile/edit/<int:store_index>/', edit_sprofile, name='store_profile'),
    path('sinventory/<int:store_index>/', view_sinventory, name='store_inventory'),
    path('sinventory/addproduct/<int:store_index>/', add_product, name='add_product'),
    path('store/search/<str:query>', search_store, name='search_store'),
    path('sinventory/product/<int:store_index>/<int:product_index>', view_sproduct, name='view_sproduct')
]
