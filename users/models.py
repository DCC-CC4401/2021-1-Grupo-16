from django.db import models
from django.contrib.auth.models import AbstractUser
from datetime import datetime

# At the moment images aren't considered in this model. 
# At the moment there isn't a validation system for the tables attributes.

class User(AbstractUser):
    gender_choices = [
        ('M',"Male"),
        ('F',"Female"),
        ('O',"Other")
    ]
    gender = models.CharField(max_length=1, choices=gender_choices, default='O')
    
    # TODO: create validation functions for rut & phone_number 
    rut = models.CharField(blank=True, max_length=12)           # OPTIONAL # Ex: 20.298.878-4 => 12 chars      
    phone_number = models.CharField(blank=True, max_length=12)  # OPTIONAL # Ex: +569XXXXXXXX => 12 chars
    
    birthday = models.DateField()
    date_of_creation = models.DateTimeField()   

class UserAddress(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    alias = models.CharField(max_length=20)
    shipping_comment = models.CharField(blank=True, max_length=255)     # OPTIONAL
    
    #TODO: create choices for each region and commune.
    region = models.CharField(max_length=20)
    commune = models.CharField(max_length=20)

    road = models.CharField(max_length=40)
    address_number = models.IntegerField()
    apartament_number = models.IntegerField() 

class Administration(models.Model):
    privilege_choices = [
        ('0',"owner"),
        ('1',"admin")
    ]
    privilege_level = models.CharField(max_length=1, choices=privilege_choices)

    user = models.ForeignKey("users.User", on_delete=models.CASCADE)
    store = models.ForeignKey("stores.Store", on_delete=models.CASCADE)
