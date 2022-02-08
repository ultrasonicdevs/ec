from pymongo import MongoClient


class MongoWorker:
    client = MongoClient('localhost', 27017)
    db = client['ec_products']
    
    def insert_product_type(self, product_type_json):
        product_types_coll = MongoWorker.db['product_types']
        product_types_coll.insert_one(product_type_json)
    