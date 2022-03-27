from concurrent.futures.thread import _worker
from typing import Type
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from ec_admin.mongoworker import MongoWorker

#TODO: Make all CBV
def index(request):
    return HttpResponse('Zatychka')

def sections(request):
    worker = MongoWorker()
    if request.is_ajax and request.method == "GET":
        return JsonResponse(worker.get_sections())

def section_detail(request, section_id):
    worker = MongoWorker()
    if request.is_ajax and request.method == "GET":
        return JsonResponse(worker.get_section(section_id))

def section_product_types(request, section_id):
    worker = MongoWorker()
    if request.is_ajax and request.method == "GET":
        return JsonResponse(worker.get_section_product_types(section_id))

def product_types(request):
    worker = MongoWorker()
    if request.is_ajax and request.method == "GET":
        return JsonResponse(worker.get_product_types())

def product_type_detail(request, type_id):
    worker = MongoWorker()
    if request.is_ajax and request.method == "GET":
        return JsonResponse(worker.get_product_type(type_id))

def products_of_certain_type(request, type_id):
    worker = MongoWorker()
    if request.is_ajax and request.method == "GET":
        return JsonResponse(worker.get_products_of_certain_type(type_id))

def products(request):
    worker = MongoWorker()
    if request.is_ajax and request.method == "GET":
        return JsonResponse(worker.get_products())

def product_detail(request, product_id):
    worker = MongoWorker()
    if request.is_ajax and request.method == "GET":
        return JsonResponse(worker.get_product(product_id))

def images(request):
    worker = MongoWorker()
    if request.is_ajax and request.method == "POST":
        print(request.FILES)
        preview_image_url_and_name = worker.save_image_and_get_url_and_name(request.FILES['preview'])
        preview_url = preview_image_url_and_name[0]
        preview_name = preview_image_url_and_name[1]
        return JsonResponse({'image_url': preview_url, 'image_name': preview_name})
    elif request.is_ajax and request.method == "DELETE":
        print('DELETTABLE IMAGE: ', request.body)
        deleted_image_name = worker.delete_image_by_name(request.body.decode('utf-8'))
        return JsonResponse({'image_name': deleted_image_name})