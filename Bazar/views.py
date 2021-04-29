"""
Bazar

Implements the main views of the app.
"""

from django.http import HttpResponse, HttpRequest
from django.shortcuts import render
from datetime import date


def view_home(request: 'HttpRequest') -> 'HttpResponse':
    """
    Home.
    """
    return render(request, 'Bazar/home.html', {})


def view_login(request: 'HttpRequest') -> 'HttpResponse':
    """
    Login.
    """
    return render(request, 'Bazar/login.html', {})


def view_signup(request: 'HttpRequest') -> 'HttpResponse':
    """
    Sign up.
    """
    return render(request, 'Bazar/signup.html', {})
