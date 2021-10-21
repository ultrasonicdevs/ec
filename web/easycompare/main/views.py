from django.http.response import HttpResponse
from django.shortcuts import render
from .models import *


def sections_list(request):
    sections = Section.objects.all()
    context = {
        'sections': sections
    }
    return render(request, 'main/sections_list.html', context)

def section(request, section_name):
    class Attribute:
        def __init__(self, attribute, value):
            self.attribute = attribute
            self.value = value
        def __str__(self):
            return self.attribute
    class FrozenObject:
        def __init__(self, name, attributes):
            self.name = name

            property_attributes = []
            for attribute, value in attributes:
                property_attributes.append(Attribute(attribute, value))

            self.attributes = property_attributes
     
        def __str__(self):
            return self.name

        
    objects_queryset = Object.objects.all()
    objects_attributes_queryset = ObjectAttribute.objects.all()
    objects_with_attributes = []
    attributes = []
    for object in objects_queryset:
        count = 0
        for attribute in objects_attributes_queryset:
            if attribute.parent_object.id == object.id and count < 3:
                count += 1
                attributes.append([attribute.attribute_type.filter_name, attribute.attribute_value])


        object_with_dot_notation = FrozenObject(object.object_name, attributes)
        objects_with_attributes.append(object_with_dot_notation)
        attributes = []
    context = {
        'objects': objects_with_attributes
    }
    return render(request, 'main/section.html', context)