from stores.forms import *
from django.shortcuts import redirect, render
from users.models import *
from django.http import HttpResponse, HttpRequest
from stores.models import *


# Create your views here.
def view_store(request: 'HttpRequest') -> 'HttpResponse':
    """
    Store front.
    """
    return render(request, 'stores/storefront.html', {})


def view_sprofile(request: 'HttpRequest', store_index: 'int') -> 'HttpResponse':
    """
    Store Profile.
    """
    administration_info = Administration.objects.filter(user_id=request.user)
    a_store = administration_info[store_index].store
    context = {
        'store': a_store,
        'store_index': store_index
    }
    return render(request, 'stores/store_profile.html', context)


def edit_sprofile(request: 'HttpRequest', store_index: 'int') -> 'HttpResponse':
    """
    Edit Profile.
    """
    administration_info = Administration.objects.filter(user_id=request.user)
    a_store = administration_info[store_index].store

    if request.method == 'POST':
        s_form = StoreForm(request.POST, instance=a_store)
        a_region = request.POST['region']
        a_commune = request.POST['commune']
        s_form.region = a_region
        s_form.commune = a_commune
        if s_form.is_valid():
            s_form.save()
            return redirect('/sprofile/{0}/'.format(str(store_index)))

    else:
        s_form = StoreForm(instance=a_store)
        context = {
            'store': a_store,
            'store_index': store_index,
            'store_form': s_form
        }
        return render(request, 'stores/edit_store_profile.html', context)


def view_sinventory(request: 'HttpRequest', store_index: 'int') -> 'HttpResponse':
    administration_info = Administration.objects.filter(user_id=request.user)
    a_store = administration_info[store_index].store
    inventory_instances = Inventory.objects.filter(store_id=a_store)
    store_inventory = [i.product for i in inventory_instances]

    context = {
        'store': a_store,
        'store_index': store_index,
        'store_inventory': store_inventory
    }
    return render(request, 'stores/store_inventory.html', context)


def add_product(request: 'HttpRequest', store_index: int) -> 'HttpResponse':
    administration_info = Administration.objects.filter(user_id=request.user)
    a_store = administration_info[store_index].store

    if request.method == 'POST':
        p_form = ProductForm(request.POST)

        if p_form.is_valid():
            product = p_form.save()
            i = Inventory(store=a_store, product=product)
            i.save()
            return redirect('/sinventory/{0}/'.format(str(store_index)))

    else:
        p_form = ProductForm()
        context = {
            'store': a_store,
            'store_index': store_index,
            'inventory_form': p_form
        }
        return render(request, 'stores/add_product.html', context)


def search_store(request: 'HttpRequest', query: str) -> 'HttpResponse':
    # Search all stories
    return HttpResponse()
