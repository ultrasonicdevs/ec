from pip import main
from pymongo import MongoClient
import json
from bson import ObjectId

class MongoWorker:
    client = MongoClient('localhost', 27017)
    db = client['ec_products']
    sections_coll = db['sections']
    product_types_coll = db['product_types']
    products_coll = db['products']

    def insert_product_type(self, product_type_json):
        self.product_types_coll.insert_one(product_type_json)
    
    def insert_section(self, section_json):
        self.sections_coll.insert_one(section_json)

    def get_section(self, section_id):
        response = self.sections_coll.find_one({'_id': ObjectId(section_id)})
        if response:
            response['_id'] = JSONEncoder().default(response['_id'])
            return response
        else:
            return {'error': 'Error 404. Object do not exist or something got wrong'}

    def get_sections(self):
        response = {
            'sections': []
        }
        sections_coll = MongoWorker.db['sections']
        encoder = JSONEncoder()
        for section in sections_coll.find():
            print(section)
            response['sections'].append({
                '_id': encoder.default(section['_id']),
                'name': section['name'],
            })
        print(response)
        return response

    def insert_product(self, product_json): 
        self.products_coll.insert_one(product_json)
    
    def get_product_types(self):
        response = {
            'product_types': []
        }
        encoder = JSONEncoder()
        for product_type in self.product_types_coll.find():
            response['product_types'].append({
                'id': encoder.default(product_type['_id']),
                'name': product_type['name'],
            })
        return response

    def get_product_type(self, type_id):
        response = self.product_types_coll.find_one({'_id': ObjectId(type_id)})
        if response:
            response['_id'] = JSONEncoder().default(response['_id'])
            return response
        else:
            return {'error': 'Error 404. Object do not exist or something got wrong'}

    def get_section_product_types(self, section_id):
        response = {
            'product_types': []
        }
        encoder = JSONEncoder()
        for product_type in self.product_types_coll.find({'section': section_id}):
            response['product_types'].append({
                '_id': encoder.default(product_type['_id']),
                'name': product_type['name'],
            })
        return response

    def get_product_type_attributes(self, product_type_id):
        response = {
            'attributes': []
        }
        product_type = self.product_types_coll.find_one({'_id': ObjectId(product_type_id)})
        print(product_type)
        response['attributes'] = product_type['attributes']
        return response

    def get_products_of_certain_type(self, type_id):
        response = {
            'products': []
        }
        encoder = JSONEncoder()
        for product in self.products_coll.find({'type': type_id}):
            product['_id'] = encoder.default(product['_id'])
            response['products'].append(product)
        print(response)
        return response


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