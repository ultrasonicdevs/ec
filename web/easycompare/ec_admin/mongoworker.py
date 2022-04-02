from urllib import response
from django.http import JsonResponse
from pip import main
from pymongo import MongoClient
import json
from bson import ObjectId
from django.core.files.storage import default_storage


class MongoWorker:
    client = MongoClient('localhost', 27017)
    db = client['ec_products']
    sections_coll = db['sections']
    product_types_coll = db['product_types']
    products_coll = db['products']

    def insert_product_type(self, product_type_json):
        self.product_types_coll.insert_one(product_type_json)
        return {
                'status': 'ok',
                'response': 'inserted ' + product_type_json['name'] + ' product type',
            }
    
    def insert_section(self, section_json):
        self.sections_coll.insert_one(section_json)
        return {
                'status': 'ok',
                'response': 'inserted ' + section_json['name'] + ' section',
            }

    def get_section(self, section_id):
        query = self.sections_coll.find_one({'_id': ObjectId(section_id)})
        if query:
            query['_id'] = JSONEncoder().default(query['_id'])
            return {
                'status': 'ok',
                'response': query,
            }
        else:
            return {
                'status': 'error',
                'response': 'section doesnt exist. wrong id?',
            }

    def get_sections(self):
        sections_list = []
        sections_coll = MongoWorker.db['sections']
        encoder = JSONEncoder()
        for section in sections_coll.find():
            print(section)
            sections_list.append({
                'id': encoder.default(section['_id']),
                'name': section['name'],
            })
        print(sections_list)
        return {
                'status': 'ok',
                'response': sections_list,
            }

    def insert_product(self, product_json): 
        self.products_coll.insert_one(product_json)
        return {
                'status': 'ok',
                'response': 'inserted product ' + product_json['name'],
            }
    
    def get_product_types(self):
        product_types_list = []
        encoder = JSONEncoder()
        for product_type in self.product_coll.find():
            product_types_list.append({
                'id': encoder.default(product_type['_id']),
                'name': product_type['name'],
            })
        return {
                'status': 'ok',
                'response': product_types_list,
            }

    def get_product_type(self, type_id):
        query = self.products_coll.find_one({'_id': ObjectId(type_id)})
        if query:
            query['_id'] = JSONEncoder().default(query['_id'])
            return {
                'status': 'ok',
                'response': query,
            }
        else:
            return {
                'status': 'error',
                'response': query,
            }

    def get_section_product_types(self, section_id):
        product_types_list = []
        encoder = JSONEncoder()
        for product_type in self.product_types_coll.find({'section': section_id}):
            product_types_list.append({
                'id': encoder.default(product_type['_id']),
                'name': product_type['name'],
            })
        return {
                'status': 'ok',
                'response': product_types_list,
            }

    def get_product_type_attributes(self, product_type_id):
        attributes_list = []
        product_type = self.product_types_coll.find_one({'_id': ObjectId(product_type_id)})
        print(product_type)
        attributes_list = product_type['attributes']
        return {
                'status': 'ok',
                'response': attributes_list,
            }

    def get_products_of_certain_type(self, type_id):
        products_list = []
        encoder = JSONEncoder()
        for product in self.products_coll.find({'type': type_id}):
            product['_id'] = encoder.default(product['_id'])
            products_list.append(product)
        print(products_list)
        return {
                'status': 'ok',
                'response': products_list,
            }

    def get_products(self):
        products_list = []
        encoder = JSONEncoder()
        for product in self.products_coll.find():
            product['_id'] = encoder.default(product['_id'])
            products_list.append(product)
        return {
                'status': 'ok',
                'response': products_list,
            }

    def get_product(self, product_id):
        response = self.products_coll.find_one({'_id': ObjectId(product_id)})
        if response:
            response['_id'] = JSONEncoder().default(response['_id'])
            return {
                'status': 'ok',
                'response': response,
            }
        else:
            return {
                'status': 'error',
                'response': response,
            }

    def save_image_and_get_url_and_name(self, image):
        image_name = default_storage.save(image.name, image)
        image_url = default_storage.url(image_name)
        return {
            'status': 'ok',
            'response': {
                'image_name': image_name,
                'image_url': image_url,
            }
        }

    def delete_image_by_name(self, image_name):
        default_storage.delete(image_name)
        return image_name


class JSONEncoder(json.JSONEncoder):
    def default(self, item):
        if isinstance(item, ObjectId):
            return str(item)
        return json.JSONEncoder.default(self, item)


def main():
    w = MongoWorker()
    w.get_sections()
    print(w.get_section('6215397de5dcaa359fc84295'))

if __name__ == '__main__':
    main()