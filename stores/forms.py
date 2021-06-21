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
            'store_image_profile',
            'store_image_banner',
            'phone_number',
            'region',
            'commune',
            'address',
            'address_number',
        ]


class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = [
            'product_name',
            'price',
            'stock',
            'short_description',
            'long_description',
            'product_image'
        ]
