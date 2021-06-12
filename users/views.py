"""
Profile

Implements the main views of the app.
"""

from django.http import HttpResponse, HttpRequest, HttpResponseRedirect
from django.shortcuts import render, redirect
from .models import UserAddress, User
from .forms import UserUpdateForm, UserAddressUpdateForm

#TODO Edit fonts for aesthetics
def edit_profile(request: 'HttpRequest') -> 'HttpResponse':
    """
    Profile.
    (ONLY AVAILABLE WITH LOGGED IN)
    """
    address = UserAddress.objects.get(user=request.user) #OBTENEMOS LA DATA DEL ADDRES DEL USUARIO
    user_address = UserAddress.objects.filter(user_id=request.user)
    if request.method == 'POST': #SI EL USER NOS MANDA SU EDIT
        u_form = UserUpdateForm(request.POST, instance=request.user) 
        address_form = UserAddressUpdateForm(data=request.POST, instance=address) 
    
        if u_form.is_valid() and address_form.is_valid(): #VALIDAMOS
            u_form.save()#GUARDAMOS EN LA BASE DE DATOS
            
            region = request.POST["region"]
            commune = request.POST["commune"]
            address_form.commune = commune #Care, strange formulas in select option
            address_form.region= region
            address_form.save()
            return redirect('/uprofile/') #REDIRIGIMOS #TENER UN PROFIEL WITHOUT EDIT PLS
    else: 
        u_form = UserUpdateForm(instance=request.user) #PRE-LLENAMOS LOS DATOS DEL USUARIO
        address_form = UserAddressUpdateForm(instance=address)

    context = {
        'u_form':u_form,
        'address_form': address_form,
        'user_address': user_address, #AGREGAR MAS FORMULARIOS SEGUN REQUIERA             
        }

    return render(request, "users/editprofile.html", context)   
        

def view_profile(request: 'HttpRequest') -> 'HttpResponse':
    """
    Profile.
    """
    address = UserAddress.objects.get(user=request.user) #CON ESTO SE OBITNEE LA BASE DE DATOS :)

    return render(request, 'users/profile.html', {'address': address})


