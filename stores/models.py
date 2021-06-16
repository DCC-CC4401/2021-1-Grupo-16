from django.db import models
from datetime import datetime
from django.core.validators import MaxValueValidator, MinValueValidator


# At the moment images aren't considered in this model.
# At the moment there isn't a validation system for the tables attributes.

class Store(models.Model):
    brand_name = models.CharField(max_length=30)
    company_name = models.CharField(max_length=30)
    short_description = models.CharField(max_length=255)
    long_description = models.CharField(max_length=4000)
    website = models.CharField(max_length=200)

    # TODO: create validation functions for phone_number 
    phone_number = models.CharField(max_length=12)

    # Store address fields:
    region = models.CharField(max_length=20)
    commune = models.CharField(max_length=20)
    road = models.CharField(max_length=40)
    address_number = models.IntegerField()
    apartament_number = models.IntegerField(blank=True)  # OPTIONAL

    # TODO: when the store is created, the date of creation MUST be 
    # datetime.datetime.today()
    date_of_creation = models.DateTimeField(default=datetime.today())

    stars = models.FloatField(validators=[MinValueValidator(0.0), MaxValueValidator(5.0), ], default=0.0)

    # TODO: when a store sets it social media links they MUST be mapped
    # to a JSON and then stored in the table.

    # Ex: the JSON must be like this:
    # {'instagram': link_instagram, 'facebook': link_facebook, 'twitter': link_twitter, 'linkedin': link_linkedin, 'youtube': link_youtube}
    social_media_links = models.JSONField(default=dict)


class Transaction(models.Model):
    store = models.ForeignKey("stores.Store", on_delete=models.CASCADE)
    user = models.ForeignKey("users.User", on_delete=models.CASCADE)
    transaction_date = models.DateTimeField()
    amount_payed = models.IntegerField()

    # TODO: when a buys a set of products in a store, those items MUST
    # be mapped to a JSON and then stored in the table.

    # Ex: the JSON must be like this:
    # {0: (product_id, quantity), ... , n: (product_id, quantity)}
    list_of_products = models.JSONField()


class Inventory(models.Model):
    store = models.ForeignKey("stores.Store", on_delete=models.CASCADE)
    product_name = models.CharField(max_length=20)
    price = models.IntegerField()
    stock = models.IntegerField()
    short_description = models.CharField(max_length=255)
    long_description = models.CharField(max_length=4000, blank=True)

    # TODO: When a product is added to the table it MUST have likes = dislikes = 0.
    likes = models.IntegerField()
    dislikes = models.IntegerField()
