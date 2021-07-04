from django.urls import path
from cart.views import *

urlpatterns = [
    path('cart/', cart, name='cart'),
]
