from django.db import models
from django.contrib.auth.models import AbstractUser
from datetime import datetime

# At the moment images aren't considered in this model. 
# At the moment there isn't a validation system for the tables attributes.

class Inventory(models.Model):
    productid = models.IntegerField(primary_key=True, unique=True)
    product_name = models.CharField(max_length=20)
    price = models.IntegerField()
    stock = models.IntegerField()
    short_description = models.CharField(max_length=255)
    long_description = models.CharField(max_length=4000)
    technical_specs = models.CharField(max_length=200)
    rating = models.IntegerField()
    store = models.ForeignKey("stores.Store", on_delete=models.CASCADE)

