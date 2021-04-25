"""
Bazar

Implements the main views of the app.
"""

from django.http import HttpResponse, HttpRequest
from django.shortcuts import render


def view_home(request: 'HttpRequest') -> 'HttpResponse':
    """
    Home app.
    """
    return render(request, 'modules/home.html', {})
