import json
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from django.core import serializers


def section(request):
    return render(request, 'ec_admin/section.html', {'active_nav': 'add_section'})

def product_type(request):
    return render(request, 'ec_admin/product_type.html', {'active_nav': 'add_type'})

def json_processing(request):
    data = None
    if request.is_ajax and request.method == "POST":
        data = json.loads(request.body)
        print(data)
    if data:
        return HttpResponse('Success!')
    else:
        return HttpResponse('Failure :(')
    