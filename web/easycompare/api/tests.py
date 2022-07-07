from django.urls import reverse
from .urls import *
from rest_framework import status
from rest_framework.test import APITestCase
from .models import *

class SectionCreateTests(APITestCase):
    def setUp(self):
        disconnect('default')
        connect('mongoenginetest', host='mongomock://localhost') 

    def test_create_valid_section(self):
        valid_payload = {
            'name': 'Section without parent',
            'parent_section': None,
        } 
        response = self.client.post(
            reverse('api:sections'),
            data=valid_payload,
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_invalid_section(self):
        invalid_payload = {
            'name': '',
            'parent_section': None,
        } 
        response = self.client.post(
            reverse('api:sections'),
            data=invalid_payload,
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_create_valid_section_with_parent(self):
        parent_section_id = self.client.post(
            reverse('api:sections'),
            data={
            'name': 'Section without parent',
            'parent_section': None,
            },
            format='json',
        ).data['id']

        valid_payload = {
            'name': 'Section with parent',
            'parent_section': parent_section_id,
        }
        
        response = self.client.post(
            reverse('api:sections'),
            data=valid_payload,
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

class SectionDeleteTests(APITestCase):
    def setUp(self):
        disconnect('default')
        connect('mongoenginetest', host='mongomock://localhost')

        self.parent_section_id = self.client.post(
            reverse('api:sections'),
            data={
                'name': 'Section without parent',
                'parent_section': None,
            },
            format='json',
        ).data['id']

        self.section_id = self.client.post(
            reverse('api:sections'),
            data={
                'name': 'Section with parent',
                'parent_section': self.parent_section_id,
            },
            format='json',
        ).data['id']

    def test_delete_all_sections(self):
        response = self.client.delete(
            reverse('api:sections',),
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Section.objects.count(), 0)

    def test_delete_section_without_children(self):
        response = self.client.delete(
            reverse('api:section-detail', args=[self.section_id]),
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Section.objects.count(), 1)

    def test_delete_section_with_children(self):
        response = self.client.delete(
            reverse('api:section-detail', args=[self.parent_section_id]),
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Section.objects.count(), 0)

class ProductTypeCreateTests(APITestCase):
    def setUp(self):
        disconnect('default')
        connect('mongoenginetest', host='mongomock://localhost')

    def tearDown(self):
        disconnect('mongoenginetest')

    def test_create_valid_product_type(self):
        self.parent_section_id = self.client.post(
            reverse('api:sections'),
            data={
                'name': 'Section without parent',
                'parent_section': None,
            },
            format='json',
        ).data['id']

        valid_payload = {
            'name': 'product type',
            'section': self.parent_section_id,
            'attributes': [
                {
                    'type': 'Текст',
                    'verbose_name': 'Разрешение',
                },
            ]
        } 
        response = self.client.post(
            reverse('api:product-types'),
            data=valid_payload,
            format='json',
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

class ProductTypeDeleteTests(APITestCase):
    def setUp(self):
        disconnect('default')
        connect('mongoenginetest', host='mongomock://localhost') 

    def tearDown(self):
        disconnect('mongoenginetest')

    def test_delete_product_type(self):
        self.parent_section_id = self.client.post(
            reverse('api:sections'),
            data={
                'name': 'Section without parent',
                'parent_section': None,
            },
            format='json',
        ).data['id']

        product_type_id = self.client.post(
            reverse('api:product-types'),
            data={
                'name': 'product type',
                'section': self.parent_section_id,
                'attributes': [
                    {
                        'type': 'Текст',
                        'verbose_name': 'Разрешение',
                    },
                ],
            },
            format='json',
        ).data['id']

        response = self.client.delete(
            reverse('api:product_type_detail', kwargs={'id':product_type_id})
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

class ProductCreateTests(APITestCase):
    def setUp(self):
        disconnect('default')
        connect('mongoenginetest', host='mongomock://localhost')

        self.parent_section_id = self.client.post(
            reverse('api:sections'),
            data={
                'name': 'Section without parent',
                'parent_section': None,
            },
            format='json',
        ).data['id']

        self.product_type_id = self.client.post(
            reverse('api:product-types'),
            data={
            'name': 'product type',
            'section': self.parent_section_id,
            'attributes': [
                {
                    'type': 'Текст',
                    'verbose_name': 'Разрешение',
                },
            ]
        },
            format='json',
        ).data['id']

        self.valid_payload = {
            'name': 'Test product',
            'type': self.product_type_id,
            'preview_url': None,
            'attributes': [
                {
                    'type': 'Текст',
                    'verbose_name': 'Разрешение',
                    'value': '1920x1080',
                },
            ],
        }

    def test_product_create(self):
        response = self.client.post(
            reverse('api:products'),
            data=self.valid_payload,
            format='json'
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

class ProductDeleteTests(APITestCase):
    def setUp(self):
        disconnect('default')
        connect('mongoenginetest', host='mongomock://localhost')

        self.parent_section_id = self.client.post(
            reverse('api:sections'),
            data={
                'name': 'Section without parent',
                'parent_section': None,
            },
            format='json',
        ).data['id']

        self.product_type_id = self.client.post(
            reverse('api:product-types'),
            data={
            'name': 'product type',
            'section': self.parent_section_id,
            'attributes': [
                {
                    'type': 'Текст',
                    'verbose_name': 'Разрешение',
                },
            ]
        },
            format='json',
        ).data['id']

        self.valid_payload = {
            'name': 'Test product',
            'type': self.product_type_id,
            'preview_url': None,
            'attributes': [
                {
                    'type': 'Текст',
                    'verbose_name': 'Разрешение',
                    'value': '1920x1080'
                }
            ]
        }

        self.product_id = self.client.post(
            reverse('api:products'),
            data=self.valid_payload,
            format='json'
        ).data['id']

    def tearDown(self):
        disconnect()

    def test_product_delete(self):
        response = self.client.delete(
            reverse('api:product_detail', args=[self.product_id])
        )
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)