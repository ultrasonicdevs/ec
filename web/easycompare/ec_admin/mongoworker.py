from django.http import JsonResponse
from pip import main
from pymongo import MongoClient
import json
from bson import ObjectId

class MongoWorker:
    client = MongoClient('localhost', 27017)
    db = client['ec_products']
    
    def insert_product_type(self, product_type_json):
        product_types_coll = MongoWorker.db['product_types']
        product_types_coll.insert_one(product_type_json)
    
    def insert_section(self, section_json):
        sections_coll = MongoWorker.db['sections']
        sections_coll.insert_one(section_json)

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
 

class JSONEncoder(json.JSONEncoder):
    def default(self, item):
        if isinstance(item, ObjectId):
            return str(item)
        return json.JSONEncoder.default(self, item)


def main():
    w = MongoWorker()
    w.get_sections()

if __name__ == '__main__':
    main()