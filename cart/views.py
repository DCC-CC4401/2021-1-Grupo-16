from stores.forms import *
from django.shortcuts import redirect, render
from users.models import *
from django.http import HttpResponse, HttpRequest, JsonResponse
from stores.models import *
from django.db.models import QuerySet
import json
import random
from django.http import JsonResponse


# Create your views here.

def cart(request: 'HttpRequest') -> 'HttpResponse':
    """
    Profile.
    """
    address = UserAddress.objects.get(user=request.user)  # CON ESTO SE OBITNEE LA BASE DE DATOS :)

    return render(request, 'cart/cart.html', {'address': address})
