from unicodedata import name
from mongoengine import *
connect('ec_products')


class AbstractAttribute(EmbeddedDocument):
    type = StringField(required=True)
    verbose_name = StringField(required=True)

class ProductType(Document):
    name = StringField(required=True)
    section = ReferenceField(Section, reference_delete_rule=CASCADE)
    attributes = EmbeddedDocumentListField(AbstractAttribute)
    meta = {'collection': 'product_types'}

class Attribute(EmbeddedDocument):
    type = StringField(required=True)
    verbose_name = StringField(required=True)
    value = StringField(required=True)

class Product(Document):
    name = StringField(required=True)
    type = ReferenceField(ProductType, reference_delete_rule=CASCADE)
    preview_url = StringField()
    attributes = EmbeddedDocumentListField(Attribute)
    meta = {'collection': 'products'}
