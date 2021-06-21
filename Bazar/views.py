"""
Bazar

Implements the main views of the app.
"""

from django.http import HttpResponse, HttpRequest, HttpResponseRedirect
from django.core.exceptions import ObjectDoesNotExist, MultipleObjectsReturned
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render
from django.utils import timezone
from datetime import date
from users.models import User, UserAddress
from typing import Optional


def authenticate_email(email, password) -> Optional[User]:
    """
    Finds an user through an email.
    """
    if email:
        try:
            user = User.objects.get(email__iexact=email)
            if user.check_password(password):
                return user
        except (ObjectDoesNotExist, MultipleObjectsReturned):
            pass
    return None


def is_used(an_username: str) -> bool:
    """
    Checks in the User table if an_username is already in use.
    """
    if len(User.objects.filter(username=an_username)) != 0:
        return True
    return False


def generate_username(an_username: str) -> str:
    """
    Gets an_username and generates a_new_username that isn't
    in use.
    """
    k = 0
    a_new_username = an_username
    while is_used(a_new_username):
        a_new_username = an_username + '_' + str(k)
        k += 1
    return a_new_username


def error(request: 'HttpRequest', error_code: str, error_msg: str) -> 'HttpResponse':
    """
    Throw error.
    """
    return render(request, 'Bazar/error.html', {'code': error_code, 'msg': error_msg})


def view_home(request: 'HttpRequest') -> 'HttpResponse':
    """
    Home.
    """
    # TODO, MAKE RESPONSIVE WITH DABASE
    return render(request, 'Bazar/home.html', {})


def view_login(request: 'HttpRequest') -> 'HttpResponse':
    """
    Login.
    """
    if request.method == 'GET':
        return render(request, 'Bazar/login.html')

    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        usuario = authenticate(username=username, password=password)
        if usuario is None:  # Try autenthicate using email
            usuario = authenticate_email(username, password)
        if usuario is not None:
            login(request, usuario)
            return HttpResponseRedirect('/home/')
        else:
            # tirar un mensaje diciendo que no tiene la cuenta y se tiene que crear una
            return HttpResponseRedirect('/signup/')


# noinspection PyTypeChecker,PyUnresolvedReferences
def view_signup(request: 'HttpRequest') -> 'HttpResponse':
    """
    Sign up.
    """
    if request.method == 'GET':
        return render(request, 'Bazar/signup.html', {})

    elif request.method == 'POST':
        a_first_name = request.POST['first_name']
        a_last_name = request.POST['last_name']
        an_email = request.POST['email']
        a_password = request.POST['password']
        a_day = int(request.POST['day'])
        a_month = int(request.POST['month'])
        a_year = int(request.POST['year'])
        a_gender = request.POST['gender']
        an_username = generate_username(an_email.split('@')[0])

        # Adding the new user to the User table.
        user = User.objects.create_user(first_name=a_first_name, last_name=a_last_name, email=an_email,
                                        password=a_password, username=an_username,
                                        birthday=date(a_year, a_month, a_day), date_of_creation=timezone.now(),
                                        gender=a_gender)
        UserAddress.objects.create(user=user)
        return HttpResponseRedirect('/login/')


# todo LOGOUT
def view_logout(request):
    logout(request)
    return HttpResponseRedirect('/home/')
