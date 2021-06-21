from django.shortcuts import render

from django.http import HttpResponse, HttpRequest, HttpResponseRedirect
from django.shortcuts import render, redirect
from django.utils import timezone
from datetime import date
from stores.models import *

# Create your views here.

def view_store(request: 'HttpRequest') -> 'HttpResponse':
    """
    Store front.
    """
    
    return render(request, 'stores/storefront.html', {})

