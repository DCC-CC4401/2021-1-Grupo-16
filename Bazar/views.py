"""
Bazar

Implements the main views of the app.
"""

from django.http import HttpResponse, HttpRequest


def view_home(request: 'HttpRequest') -> 'HttpResponse':
    """
    Home app.
    """
    return HttpResponse('test')
