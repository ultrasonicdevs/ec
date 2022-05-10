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

    def get_product_type_filters(self, type_id):
        query = self.products_coll.aggregate([
        {
            '$match': { 'type': ObjectId(type_id)}
        },

        {
            '$unwind': '$attributes'
        },

        {
            '$group': { '_id': '$attributes.verbose_name', 'attributes': { '$addToSet': '$attributes.value' } }
        },

        {
            '$project': {'_id': 0, 'filter_group_name': '$_id', 'attributes': 1}
        },
        ])
        product_type_filters = list(query)
        return {
                'status': 'ok',
                'response': {
                    'product_type_name': self.get_product_type(type_id)['response']['name'],
                    'product_type_filters': product_type_filters,
                }
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
        for product_type in self.product_types_coll.find():
            product_types_list.append({
                'id': encoder.default(product_type['_id']),
                'name': product_type['name'],
                'parent_section': product_type['section']
            })
        return {
                'status': 'ok',
                'response': product_types_list,
            }

    def get_product_type(self, type_id):
        query = self.product_types_coll.find_one({'_id': ObjectId(type_id)})
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
        for product_type in self.product_types_coll.find({'section': ObjectId(section_id)}):
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
        for product in self.products_coll.find({'type': ObjectId(type_id)}):
            product['_id'] = encoder.default(product['_id'])
            product['type'] = encoder.default(product['type'])
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
        if default_storage.exists(image_name):
            default_storage.delete(image_name)
            return {
                'status': 'ok',
                'response': 'deleted ' + str(image_name) + ' image',
            }
        else:
            return {
                'status': 'error',
                'response': 'image with name ' + str(image_name) + ' do not exist',
            }

    def delete_all_sections(self):
        documents_amount = self.sections_coll.estimated_document_count()
        if documents_amount == 0:
            return {
                'status': 'error',
                'response': 'sections collection is already empty',
            }

        query = self.sections_coll.delete_many({})

        if query.deleted_count == documents_amount and self.delete_all_products()['status'] == 'ok' \
            and self.delete_all_product_types()['status'] == 'ok':
            return {
                'status': 'ok',
                'response': 'successfully deleted ' + str(documents_amount) + ' product types',
            }
        else:
            return {
                'status': 'error',
                'response': 'product types amount before deletion didnt match deleted products count',
            }

    def delete_product_type(self, type_id):
        query = self.product_types_coll.delete_one({
            '_id': ObjectId(type_id)
        })

        if query.deleted_count == 1 and self.delete_products_of_certain_type(type_id)['status'] == 'ok':
            return {
                'status': 'ok',
                'response': 'deleted ' + type_id + ' product type and all of its products',
            }
        else:
            return {
                'status': 'error',
                'response': 'product type already deleted or it doesnt have any products',
            }


    def delete_all_product_types(self):
        documents_amount = self.product_types_coll.estimated_document_count()
        if documents_amount == 0:
            return {
                'status': 'error',
                'response': 'product_types collection is already empty',
            }

        query = self.product_types_coll.delete_many({})

        if query.deleted_count == documents_amount and self.delete_all_products()['status'] == 'ok':
            return {
                'status': 'ok',
                'response': 'successfully deleted ' + str(documents_amount) + ' product types',
            }
        else:
            return {
                'status': 'error',
                'response': 'product types amount before deletion didnt match deleted products count',
            }

    def delete_all_products(self):
        documents_amount = self.products_coll.estimated_document_count()
        if documents_amount == 0:
            return {
                'status': 'error',
                'response': 'products collection is already empty',
            }
        
        query = self.products_coll.delete_many({})

        if query.deleted_count == documents_amount:
            return {
                'status': 'ok',
                'response': 'successfully deleted ' + str(documents_amount) + ' products',
            }
        else:
            return {
                'status': 'error',
                'response': 'products amount before deletion didnt match deleted products count',
            }

    def delete_product_by_id(self, product_id):
        query = self.products_coll.delete_one({
            '_id': ObjectId(product_id),
        })

        if query.deleted_count == 1:
            return {
                'status': 'ok',
                'response': 'successfully deleted product with id ' + str(product_id),
            }
        else:
            return {
                'status': 'error',
                'response': 'product is not deleted. maybe wrong id?',
            }

    def delete_products_of_certain_type(self, type_id):
        query = self.products_coll.delete_many({
            'type': type_id,
        })

        if query.deleted_count:
            return {
                'status': 'ok',
                'response': 'successfully deleted ' + str(query.deleted_count) + ' documents',
            }
        else:
            return {
                'status': 'error',
                'response': 'wrong type id or all documents are already deleted',
            }

    def delete_all_product_types_inside_section(self, section_id):
        query = self.product_types_coll.delete_many({
            'section': section_id,
        })

        if query.deleted_count:
            return {
                'status': 'ok',
                'response': 'successfully deleted ' + str(query.deleted_count) + ' documents',
            }
        else:
            return {
                'status': 'error',
                'response': 'wrong section id or all documents are already deleted',
            }

    def delete_section(self, section_id):
        query = self.sections_coll.delete_one({
            '_id': ObjectId(section_id),
        })

        if query.deleted_count == 1:
            return {
                'status': 'ok',
                'response': 'successfully deleted section with id ' + str(section_id),
            }
        else:
            return {
                'status': 'error',
                'response': 'section is not deleted. maybe wrong id?',
            }

    def get_filtered_products(self, selected_filters_json, product_type):
        exp = {
            '$and': [
                {
                    'type': ObjectId(product_type)
                },
            ]
        }
        print(selected_filters_json)
        for filter_group, index in zip(selected_filters_json, range(1, len(selected_filters_json) + 1)):
            exp['$and'].append({
                '$or': [],
            })
            for selected_filter in filter_group['attributes']:
                exp['$and'][index]['$or'].append({
                    'attributes': {
                        '$elemMatch':{
                            'verbose_name': filter_group['filter_group_name'],
                            'value': selected_filter,
                        }
                    }
                })
        print(exp)
        query = self.products_coll.find(exp)
        response = []
        for document in query:
            document['_id'] = JSONEncoder().default(document['_id'])
            document['type'] = JSONEncoder().default(document['type'])
            response.append(document)
        return {
            'status': 'ok',
            'response': response,
        }


class JSONEncoder(json.JSONEncoder):
    def default(self, item):
        if isinstance(item, ObjectId):
            return str(item)
        return json.JSONEncoder.default(self, item)


def main():
    w = MongoWorker()
    print(w.delete_all_sections())


if __name__ == '__main__':
    main()
