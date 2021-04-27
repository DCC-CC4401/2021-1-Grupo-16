from django.db import models
from django.contrib.auth.models import AbstractUser
from datetime import datetime

# At the moment images aren't considered in this model. 
# At the moment there isn't a validation system for the tables attributes.

class User(AbstractUser):
    gender_choices = [('M',"Male"),('F',"Female"),('O',"Other")]

    rut = models.CharField(blank=True, max_length=12)
    gender = models.CharField(choices=gender_choices, max_length=1)
    birthday = models.DateField()
    phone_number = models.CharField(max_length=12) # +569XXXXXXXX 
    date_of_creation = models.DateTimeField(default=datetime.today())

class UserAddress(models.Model):
    addressid = models.IntegerField(primary_key=True, unique=True)
    alias = models.CharField(max_length=20)
    shipping_comment = models.CharField(max_length=255)
    region = models.CharField(max_length=20)
    commune = models.CharField(max_length=20)
    road = models.CharField(max_length=40)
    address_number = models.IntegerField()
    apartament_number = models.IntegerField() 
    user = models.ForeignKey(User, on_delete=models.CASCADE)

class Administration(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    store = models.ForeignKey("stores.Store", on_delete=models.CASCADE)
    privilege_level = models.IntegerField()             # TODO: choices
