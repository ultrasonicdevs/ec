from django.db import models

class Section(models.Model):
    class Meta:
        verbose_name = 'Раздел'
        verbose_name_plural = 'Разделы'

    section_name = models.CharField(max_length=50, verbose_name='Имя раздела')

    def __str__(self) -> str:
        return self.section_name


class Object(models.Model):
    class Meta:
        verbose_name = 'Объект'
        verbose_name_plural = 'Объекты'

    object_name = models.CharField(max_length=50, verbose_name='Имя объекта')
    object_section = models.ForeignKey(Section, on_delete=models.CASCADE, verbose_name='Раздел объекта')

    def __str__(self) -> str:
        return '{}: {}'.format(self.object_section, self.object_name)

class SectionFilter(models.Model):
    class Meta:
        verbose_name = 'Фильтр раздела'
        verbose_name_plural = 'Фильтры раздела'

    TYPES = [
        ('MUL', 'Множественный выбор'),
        ('SNGL', 'Единичный выбор')
    ]
    filter_name = models.CharField(max_length=50, verbose_name='Название фильтра')
    filter_type = models.CharField(choices=TYPES, max_length=30, blank=False, verbose_name='Тип фильтра')
    filter_section = models.ForeignKey(Section, on_delete=models.CASCADE, default=None, verbose_name='Раздел, в котором будет доступен фильтр')

    def __str__(self) -> str:
        return '{}: фильтр типа {} в разделе {}'.format(self.filter_name, self.TYPES[self.filter_type], self.filter_section)

class ObjectAttribute(models.Model):
    class Meta:
        verbose_name = 'Характеристика объекта'
        verbose_name_plural = 'Характеристики объекта'

    attribute_type = models.ForeignKey(SectionFilter, on_delete=models.CASCADE, default=None, verbose_name='Характеристика')
    parent_object = models.ForeignKey(Object, on_delete=models.CASCADE,default=None, verbose_name='Объект')   
    attribute_value = models.CharField(max_length=50, verbose_name='Значение характеристики')
    
    def __str__(self) -> str:
        return '{} {}'.format(self.attribute_type.filter_name, self.parent_object.object_name)


# class FinalizedObject(models.Model):
#     def __init__(self) -> None:
#         objects_queryset = Object.objects.all()
#         objects_attributes_queryset = ObjectAttribute.objects.all()
#         for object in objects_queryset:
#             self.object_instance = object
#             self.object_instance_properties = objects_attributes_queryset.filter(parent_object=object)
#             self.save()
# FinalizedObject()