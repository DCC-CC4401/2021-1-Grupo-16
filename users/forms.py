from django import forms
from .models import *


class UserUpdateForm(forms.ModelForm):  # ESTO ES PARA PODER CAMBIAR LA INFO DEL USUARIO
    class Meta:
        model = User  # TOMAMOS EL USER DEL MODELO
        fields = ['first_name', 'last_name', 'email', 'rut', 'phone_number']  # LOS CAMPOS QUE QUEREMOS CAMBIAR


class UserAddressUpdateForm(forms.ModelForm):
    class Meta:
        model = UserAddress
        fields = ['address', 'region', 'commune', 'address_number']
