from itertools import product
from rest_framework_mongoengine.serializers import DocumentSerializer
from api.models import *


class SectionSerializer(DocumentSerializer):
    class Meta:
        model = Section
        fields = ('id', 'name', 'parent_section')

class ProductTypeSerializer(DocumentSerializer):
    class Meta:
        model = ProductType
        fields = '__all__'

class ProductSerializer(DocumentSerializer):
    class Meta:
        model = Product
        fields = '__all__'