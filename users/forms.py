from django import forms
from .models import User, UserAddress
from django.contrib.auth.forms import UserCreationForm #Ver esto para el register

class UserUpdateForm(forms.ModelForm): #ESTO ES PARA PODER CAMBIAR LA INFO DEL USUARIO
    class Meta:
        model = User    #TOMAMOS EL USER DEL MODELO
        fields = ['first_name', 'last_name', 'email', 'username'] #LOS CAMPOS QUE QUEREMOS CAMBIAR 
        

class UserAddressUpdateForm(forms.ModelForm):
    class Meta:
        model = UserAddress
        fields = ['road']
