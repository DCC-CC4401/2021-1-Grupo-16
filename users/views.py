"""
Profile

Implements the main views of the app.
"""

from django.http import HttpResponse, HttpRequest
from django.shortcuts import render, redirect
from .models import Administration, UserAddress
from .forms import UserUpdateForm, UserAddressUpdateForm
from stores.forms import *


# TODO Edit fonts for aesthetics
def edit_uprofile(request: 'HttpRequest') -> 'HttpResponse':
    """
    Profile.
    (ONLY AVAILABLE WITH LOGGED IN)
    """
    address = UserAddress.objects.get(user=request.user)  # OBTENEMOS LA DATA DEL ADDRES DEL USUARIO
    user_address = UserAddress.objects.filter(user_id=request.user)
    if request.method == 'POST':  # SI EL USER NOS MANDA SU EDIT
        u_form = UserUpdateForm(request.POST, instance=request.user)
        address_form = UserAddressUpdateForm(data=request.POST, instance=address)

        if u_form.is_valid() and address_form.is_valid():  # VALIDAMOS
            u_form.save()  # GUARDAMOS EN LA BASE DE DATOS

            region = request.POST['region']
            commune = request.POST['commune']
            address_form.commune = commune  # Care, strange formulas in select option
            address_form.region = region
            address_form.save()
            return redirect('/uprofile/')  # REDIRIGIMOS #TENER UN PROFILE WITHOUT EDIT PLS
    else:
        u_form = UserUpdateForm(instance=request.user)  # PRE-LLENAMOS LOS DATOS DEL USUARIO
        address_form = UserAddressUpdateForm(instance=address)

    context = {
        'u_form': u_form,
        'address_form': address_form,
        'user_address': user_address,  # AGREGAR MAS FORMULARIOS SEGUN REQUIERA
    }
    return render(request, 'users/edit_user_profile.html', context)


def view_uprofile(request: 'HttpRequest') -> 'HttpResponse':
    """
    Profile.
    """
    address = UserAddress.objects.get(user=request.user)  # CON ESTO SE OBITNEE LA BASE DE DATOS :)
    return render(request, 'users/user_profile.html', {'address': address})


def view_ustores(request: 'HttpRequest') -> 'HttpResponse':
    administration_info = Administration.objects.filter(user_id=request.user)
    user_stores = []

    stores_indices_global = []
    for instance in administration_info:
        user_stores.append(instance.store)
        stores_indices_global.append(instance.store.id)
    stores_indices = [k for k in range(0, len(user_stores))]

    context = {
        'user_stores': list(zip(stores_indices, stores_indices_global, user_stores))
    }
    return render(request, 'users/user_stores.html', context)


def create_ustore(request: 'HttpRequest') -> 'HttpResponse':
    if request.method == 'POST':
        store_form = StoreForm(request.POST)
        a_region = request.POST['region']
        a_commune = request.POST['commune']
        store_form.region = a_region
        store_form.commune = a_commune

        if store_form.is_valid():
            a_store = store_form.save()
            a_user = request.user
            a_privilege_lvl = '0'

            adm = Administration(user=a_user, store=a_store, privilege_level=a_privilege_lvl)
            adm.save()
            return redirect('/ustores/')

    else:
        store_form = StoreForm()
        context = {
            'store_form': store_form
        }
        return render(request, 'users/create_store.html', context)
