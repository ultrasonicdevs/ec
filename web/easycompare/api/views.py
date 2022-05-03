from cgitb import lookup
import json
from django.http import HttpResponse, JsonResponse
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from ec_admin.mongoworker import MongoWorker
import urllib.parse
from rest_framework import status

from api.serializers import *
from .models import *


#TODO: Make all CBV
def index(request):
    return HttpResponse('Zatychka')

class Sections(APIView):
    renderer_classes = [JSONRenderer]
    def get(self, request):
        queryset = Section.objects.all()
        serializer = SectionSerializer(queryset, many=True)
        return Response({'response': serializer.data})

    def post(self, request):
        serializer = SectionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        Section.objects.all().delete()
        return Response(status=status.HTTP_410_GONE)

class ProductTypes(APIView):
    renderer_classes = [JSONRenderer]
    def get(self, request):
        queryset = ProductType.objects.all()
        serializer = ProductTypeSerializer(queryset, many=True)
        return Response({'response': serializer.data})

    def post(self, request):
        serializer = ProductTypeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        ProductType.objects.all().delete()
        return Response(status=status.HTTP_410_GONE)

class Products(APIView):
    renderer_classes = [JSONRenderer]
    def get(self, request):
        queryset = Product.objects.all()
        serializer = ProductSerializer(queryset, many=True)
        return Response({'response': serializer.data})

    def post(self, request):
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request):
        Product.objects.all().delete()
        return Response(status=status.HTTP_410_GONE)

class SectionDetail(RetrieveUpdateDestroyAPIView):
    serializer_class = SectionSerializer
    queryset = Section.objects.all()
    lookup_field = 'id'

def product_type_detail(request, type_id):
    worker = MongoWorker()
    if request.is_ajax and request.method == "GET":
        return JsonResponse(worker.get_product_type(type_id))
    elif request.is_ajax and request.method == "DELETE":
        return JsonResponse(worker.delete_product_type(type_id))

def product_type_filters(request, type_id):
    worker = MongoWorker()
    if request.is_ajax and request.method == "GET":
        return JsonResponse(worker.get_product_type_filters(type_id))

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

def product_type_get_filtered(request, type_id):
    worker = MongoWorker()
    if request.is_ajax and request.method == "GET":
        selected_filters_json = json.loads(urllib.parse.unquote_plus(request.headers['Selected-Filters']))
        return JsonResponse(worker.get_filtered_products(selected_filters_json, type_id), safe=False)