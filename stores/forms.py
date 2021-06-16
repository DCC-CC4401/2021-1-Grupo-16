from django import forms
from .models import *

class StoreForm(forms.ModelForm):
    class Meta:
        model = Store
        fields = [
            'brand_name', 
            'company_name', 
            'short_description',
            'long_description',
            'website',
            'phone_number',
            'region',
            'commune',
            'road',
            'address_number',
            'apartament_number',
            ]