from django.db import models
from django.contrib.auth.models import AbstractUser
from datetime import datetime

# At the moment images aren't considered in this model. 
# At the moment there isn't a validation system for the tables attributes.

class Store(models.Model):
    brand_name = models.CharField(max_length=30)
    company_name = models.CharField(max_length=30)
    short_description = models.CharField(max_length=255)
    long_description = models.CharField(max_length=4000)

    # TODO: create validation functions for phone_number 
    phone_number = models.CharField(max_length=12)

    website = models.CharField(max_length=200)
    date_of_creation = models.DateTimeField(default=datetime.today())
    
    # TODO: when a store sets it social media links they MUST be mapped
    # to a JSON and then stored in the table.

    # Ex: the JSON must be like this:
    # {'instagram': link_instagram, 'facebook': link_facebook, 'twitter': link_twitter, 'linkedin': link_linkedin, 'youtube': link_youtube}
    social_media_links = models.JSONField()

class Transaction(models.Model):
    store = models.ForeignKey("stores.Store", on_delete=models.CASCADE)
    user = models.ForeignKey("users.User", on_delete=models.CASCADE)
    transaction_date = models.DateTimeField(default=datetime.today())
    amount_payed = models.IntegerField()
    
    # TODO: when a buys a set of products in a store, those items MUST
    # be mapped to a JSON and then stored in the table.

    # Ex: the JSON must be like this:
    # {0: (product_id, quantity), ... , n: (product_id, quantity)}
    list_of_products = models.JSONField()  

class Inventory(models.Model):
    product_name = models.CharField(max_length=20)
    price = models.IntegerField()
    stock = models.IntegerField()
    short_description = models.CharField(max_length=255)
    long_description = models.CharField(max_length=4000)
    likes = models.IntegerField()
    dislikes = models.IntegerField()
    store = models.ForeignKey("stores.Store", on_delete=models.CASCADE) 


    