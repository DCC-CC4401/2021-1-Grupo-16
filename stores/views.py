from stores.forms import *
from django.shortcuts import redirect, render
from users.models import *
from django.http import HttpResponse, HttpRequest
from stores.models import *
from django.db.models import QuerySet
import json
import random


# Create your views here.
def view_store(request: 'HttpRequest', store_index: int) -> 'HttpResponse':
    """
    Store front.
    """
    # Load products
    try:
        a_store: 'QuerySet' = Store.objects.filter(id=store_index)
        product_id = Inventory.objects.filter(store_id=store_index)
        # inventory_instances = Inventory.objects.filter(store_id=a_store)
        store_inventory = [i.product for i in product_id]
    except IndexError:
        return redirect('/error/UNKNOWN_STORE/Tienda solicitada no existe')
    if len(a_store) != 1:
        return redirect('/error/UNKNOWN_STORE/Tienda solicitada no existe')
    context = {
        'store': a_store[0],
        'store_index': store_index,
        'store_inventory': store_inventory
    }
    return render(request, 'stores/storefront.html', context)


def view_sprofile(request: 'HttpRequest', store_index: int) -> 'HttpResponse':
    """
    Store Profile.
    """
    administration_info = Administration.objects.filter(user_id=request.user)
    try:
        a_store = administration_info[store_index].store
    except IndexError:
        return redirect('/error/UNKNOWN_STORE/Tienda solicitada no existe')
    context = {
        'store': a_store,
        'store_index': store_index
    }
    return render(request, 'stores/store_profile.html', context)


def edit_sprofile(request: 'HttpRequest', store_index: int) -> 'HttpResponse':
    """
    Edit Profile.
    """
    administration_info = Administration.objects.filter(user_id=request.user)
    try:
        a_store = administration_info[store_index].store
    except IndexError:
        return redirect('/error/UNKNOWN_STORE/Tienda solicitada no existe')

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


def view_sinventory(request: 'HttpRequest', store_index: int) -> 'HttpResponse':
    # TODO: VERY IMPORTANT PLEASE FIX. SECURITY FAIL BECAUSE GLOBAL INDEX ALLOW TO EVERYONE CAN EDIT
    administration_info = Administration.objects.filter(user_id=request.user)

    try:
        a_store = administration_info[store_index].store
    except IndexError:
        return redirect('/error/UNKNOWN_STORE/Tienda solicitada no existe')
    inventory_instances = Inventory.objects.filter(store_id=a_store)
    store_inventory = [i.product for i in inventory_instances]
    context = {
        'store': a_store,
        'store_index': store_index,
        'products': store_inventory
    }
    return render(request, 'stores/store_inventory.html', context)


def view_sproduct(request: 'HttpRequest', store_index: int, product_index: int):
    store_products = Inventory.objects.filter(store_id=store_index)
    administration_info = Administration.objects.filter(user_id=request.user)

    try:
        a_store = administration_info[store_index].store
    except IndexError:
        return redirect('/error/UNKNOWN_STORE/Tienda solicitada no existe')

    inventory_instances = Inventory.objects.filter(store_id=a_store)

    # try:
    a_product = None
    iii = [i.product for i in inventory_instances]
    for product in inventory_instances:
        if product.id == product_index:
            a_product = product.product
            break

    if a_product is None:
        return redirect('/error/UNKNOWN_PRODUCT/Producto solicitado no existe')

    if request.method == 'POST':
        p_form = ProductForm(request.POST, instance=a_product)
        if p_form.is_valid():
            p_form.save()
            return redirect('/sinventory/{0}'.format(str(store_index)))

    else:
        p_form = ProductForm(instance=a_product)
        context = {
            'store': a_store,
            'store_index': store_index,
            'product': a_product,
            'product_index': product_index,
            'product_form': p_form
        }
        return render(request, 'stores/edit_product.html', context)


def add_product(request: 'HttpRequest', store_index: int) -> 'HttpResponse':
    administration_info = Administration.objects.filter(user_id=request.user)
    try:
        a_store = administration_info[store_index].store
    except IndexError:
        return redirect('/error/UNKNOWN_STORE/Tienda solicitada no existe')

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
    query = str(query)
    if query == '__SEACH_ALL_HOME__':
        query = ''
    by_name: 'QuerySet' = Store.objects.filter(brand_name__icontains=query)
    results = {}
    i = 0 if query != '' else random.randint(-100000, 1000000)
    k = ('id', 'brand_name', 'store_image_profile', 'region', 'commune', 'stars',
         'short_description', 'long_description')
    for v in by_name.values():
        m = {}
        for j in k:
            m[j] = v[j]
        results[i] = m
        if query == '':
            i += random.randint(-100000, 1000000)
        else:
            i += 1

    return HttpResponse(json.dumps(results))
