from django.db import models
from django.contrib.auth.models import AbstractUser
from datetime import datetime

# At the moment images aren't considered in this model. 
# At the moment there isn't a validation system for the tables attributes.

class Store(models.Model):
    storeid = models.IntegerField(primary_key=True, unique=True)
    brand_name = models.CharField(max_length=20)
    company_name = models.CharField(max_length=20)
    short_description = models.CharField(max_length=255)
    long_description = models.CharField(max_length=4000)
    phone_number = models.CharField(max_length=12)
    social_media_links = models.CharField(max_length=200)     # TODO: replace CharField for PostgreSQL ArrayField
    website = models.CharField(max_length=200)
    date_of_creation = models.DateTimeField(default=datetime.today())

class Transaction(models.Model):
    transactionid = models.IntegerField(primary_key=True, unique=True)
    transaction_date = models.DateTimeField(default=datetime.today())
    list_of_products = models.CharField(max_length=200)   # TODO: replace CharField for PostgreSQL ArrayField
    amount_payed = models.IntegerField()
    store = models.ForeignKey(Store, on_delete=models.CASCADE)
    user = models.ForeignKey("users.User", on_delete=models.CASCADE)