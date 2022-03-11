from concurrent.futures.thread import _worker
from typing import Type
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from ec_admin.mongoworker import MongoWorker


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