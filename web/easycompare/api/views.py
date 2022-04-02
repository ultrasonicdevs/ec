import json
from django.http import HttpResponse, JsonResponse
from ec_admin.mongoworker import MongoWorker

#TODO: Make all CBV
def index(request):
    return HttpResponse('Zatychka')

def sections(request):
    worker = MongoWorker()
    if request.is_ajax and request.method == "GET":
        return JsonResponse(worker.get_sections())
    elif request.is_ajax and request.method == "POST":
        section_json = json.loads(request.body)
        return JsonResponse(worker.insert_section(section_json))
    elif request.is_ajax and request.method == "DELETE":
        return JsonResponse(worker.delete_all_sections())

def product_types(request):
    worker = MongoWorker()
    if request.is_ajax and request.method == "GET":
        return JsonResponse(worker.get_product_types())
    elif request.is_ajax and request.method == "POST":
        product_type_json = json.loads(request.body)
        return JsonResponse(worker.insert_product_type(product_type_json))
    elif request.is_ajax and request.method == "DELETE":
        return JsonResponse(worker.delete_all_product_types())

def products(request):
    worker = MongoWorker()
    if request.is_ajax and request.method == "GET":
        return JsonResponse(worker.get_products())
    elif request.is_ajax and request.method == "POST":
        return JsonResponse(worker.insert_product(json.loads(request.body)))
    elif request.is_ajax and request.method == "DELETE":
        return JsonResponse(worker.delete_all_products())

def section_detail(request, section_id):
    worker = MongoWorker()
    if request.is_ajax and request.method == "GET":
        return JsonResponse(worker.get_section(section_id))
    elif request.is_ajax and request.method == "DELETE":
        return JsonResponse(worker.delete_section(section_id))

def product_type_detail(request, type_id):
    worker = MongoWorker()
    if request.is_ajax and request.method == "GET":
        return JsonResponse(worker.get_product_type(type_id))
    elif request.is_ajax and request.method == "DELETE":
        return JsonResponse(worker.delete_product_type(type_id))

def product_detail(request, product_id):
    worker = MongoWorker()
    if request.is_ajax and request.method == "GET":
        return JsonResponse(worker.get_product(product_id))
    elif request.is_ajax and request.method == "DELETE":
        return JsonResponse(worker.delete_product_by_id(product_id))

def section_product_types(request, section_id):
    worker = MongoWorker()
    if request.is_ajax and request.method == "GET":
        return JsonResponse(worker.get_section_product_types(section_id))
    elif request.is_ajax and request.method == "DELETE":
        return JsonResponse(worker.delete_all_product_types_inside_section(section_id))

def products_of_certain_type(request, type_id):
    worker = MongoWorker()
    if request.is_ajax and request.method == "GET":
        return JsonResponse(worker.get_products_of_certain_type(type_id))
    elif request.is_ajax and request.method == "DELETE":
        return JsonResponse(worker.delete_products_of_certain_type(type_id))

def images(request):
    worker = MongoWorker()
    if request.is_ajax and request.method == "POST":
        print(request.FILES)
        worker_response = worker.save_image_and_get_url_and_name(request.FILES['preview'])['response']
        preview_url = worker_response['image_url']
        preview_name = worker_response['image_name']
        return JsonResponse({'image_url': preview_url, 'image_name': preview_name})
    elif request.is_ajax and request.method == "DELETE":
        return JsonResponse(worker.delete_image_by_name(request.body.decode('utf-8')))