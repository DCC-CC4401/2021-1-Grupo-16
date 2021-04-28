"""
Bazar

Implements the main views of the app.
"""

from django.http import HttpResponse, HttpRequest
from django.shortcuts import render


def view_home(request: 'HttpRequest') -> 'HttpResponse':
    """
    Home.
    """
    return render(request, 'modules/home.html', {})


def view_login(request: 'HttpRequest') -> 'HttpResponse':
    """
    Login.
    """
    return render(request, 'modules/login.html', {})
