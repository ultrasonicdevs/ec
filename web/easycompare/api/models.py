from mongoengine import *


class Section(Document):
    name = StringField(required=True)
    parent_section = ReferenceField(
        'self', 
        reverse_delete_rule=CASCADE,
        null=True
    )
    meta = {'collection': 'sections'}

class AbstractAttribute(EmbeddedDocument):
    type = StringField(required=True)
    verbose_name = StringField(required=True)

class ProductType(Document):
    name = StringField(required=True)
    section = ReferenceField(Section, reverse_delete_rule=CASCADE)
    attributes = EmbeddedDocumentListField(AbstractAttribute)
    meta = {'collection': 'product_types'}

class Attribute(EmbeddedDocument):
    type = StringField(required=True)
    verbose_name = StringField(required=True)
    value = StringField(required=True)

class Product(Document):
    name = StringField(required=True)
    type = ReferenceField(ProductType, reverse_delete_rule=CASCADE)
    preview_url = StringField(null=True)
    attributes = EmbeddedDocumentListField(Attribute)
    meta = {'collection': 'products'}
