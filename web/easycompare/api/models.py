from unicodedata import name
from mongoengine import *
connect('ec_products')


class Section(Document):
    name = StringField(required=True)
    parent_section = ReferenceField(
        'self', 
        reference_delete_rule=CASCADE,
    )
    meta = {'collection': 'sections'}

    @queryset_manager
    def serialized(self, queryset):
        data = []
        for section in queryset:
            data.append({
                'id': str(section.id),
                'name': section.name,
                'parent_section': str(section.parent_section.id if section.parent_section else None)
            })
        return data

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
