import json
from django.http import JsonResponse
from django.shortcuts import render
from django.core import serializers


def section(request):
    return render(request, 'ec_admin/section.html', {'active_nav': 'add_section'})

def product_type(request):
    return render(request, 'ec_admin/product_type.html', {'active_nav': 'add_type'})

def json_processing(request):
    if request.is_ajax and request.method == "POST":
        data = json.loads(request.body)
        print(data)
    return JsonResponse(data or None)
    # # request should be ajax and method should be POST.
    # if request.is_ajax and request.method == "POST":
    #     # get the form data
    #     form = FriendForm(request.POST)
    #     # save the data and after fetch the object in instance
    #     if form.is_valid():
    #         instance = form.save()
    #         # serialize in new friend object in json
    #         ser_instance = serializers.serialize('json', [ instance, ])
    #         # send to client side.
    #         return JsonResponse({"instance": ser_instance}, status=200)
    #     else:
    #         # some form errors occured.
    #         return JsonResponse({"error": form.errors}, status=400)

    # # some error occured
    # return JsonResponse({"error": ""}, status=400)
