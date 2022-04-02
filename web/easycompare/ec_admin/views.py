import json
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from ec_admin.mongoworker import MongoWorker


def index(request):
    return render(request, 'ec_admin/base.html', {'active_nav': 'index'})

def section(request):
    return render(request, 'ec_admin/section.html', {'active_nav': 'add_section'})

def product_type(request):
    return render(request, 'ec_admin/product_type.html', {'active_nav': 'add_type'})

def product(request):
    worker = MongoWorker()
    context = {
        'active_nav': 'add_product',
        'types': worker.get_product_types()['response']
        }
    return render(request, 'ec_admin/product.html', context)

def product_submit(request):
    product_json = None
    if request.is_ajax and request.method == "POST":
        product_json = json.loads(request.body)
        worker = MongoWorker()
        worker.insert_product(product_json)
        return JsonResponse({'status': 'ok', 'message': 'successfully added to db'}, status=200)
    else:
        return HttpResponse('<h1>BadRequest 400</h1>', status=400)

def get_product_types(request):
    worker = MongoWorker()
    if request.is_ajax and request.method == "GET":
        return JsonResponse(worker.get_product_types())

def get_type_attributes(request):
    worker = MongoWorker()
    if request.is_ajax and request.method == "GET":
        product_type_id = request.headers['Product-Type-Id']
        return JsonResponse(worker.get_product_type_attributes(product_type_id))

def product_type_submit(request):
    product_type_json = None
    if request.is_ajax and request.method == "POST":
        product_type_json = json.loads(request.body)
        worker = MongoWorker()
        worker.insert_product_type(product_type_json)
        return JsonResponse({'status': 'ok', 'message': 'successfully added to db'}, status=200)
    else:
        return HttpResponse('<h1>BadRequest 400</h1>', status=400)

def section_submit(request):
    section_json = None
    if request.is_ajax and request.method == "POST":
        section_json = json.loads(request.body)
        worker = MongoWorker()
        worker.insert_section(section_json)
        return JsonResponse({'status': 'ok', 'message': 'successfully added to db'}, status=200)
    else:
        return HttpResponse('<h1>BadRequest 400</h1>', status=400)

def get_parent_sections(request):
    worker = MongoWorker()
    if request.is_ajax and request.method == "GET":
        return JsonResponse(worker.get_sections())

def facets(request):
    worker = MongoWorker()
    context = {
        'active_nav': 'facets',
        'types': worker.get_product_types()['response']
        }
    return render(request, 'ec_admin/facets.html', context)
