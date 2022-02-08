import json
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from ec_admin.mongoworker import MongoWorker


def section(request):
    return render(request, 'ec_admin/section.html', {'active_nav': 'add_section'})

def product_type(request):
    return render(request, 'ec_admin/product_type.html', {'active_nav': 'add_type'})

def product_type_submit(request):
    product_type_json = None
    if request.is_ajax and request.method == "POST":
        product_type_json = json.loads(request.body)
        worker = MongoWorker()
        worker.insert_product_type(product_type_json)
        return JsonResponse({'status': 'ok', 'message': 'successfully added to db'}, status=200)
    else:
        return HttpResponse('<h1>BadRequest 400</h1>', status=400)
    
