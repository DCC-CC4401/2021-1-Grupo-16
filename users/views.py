"""
Profile

Implements the main views of the app.
"""

from django.http import HttpResponse, HttpRequest
from django.shortcuts import render


def view_profile(request: 'HttpRequest') -> 'HttpResponse':
    """
    Home.
    """
    return render(request, 'users/profile.html', {})
