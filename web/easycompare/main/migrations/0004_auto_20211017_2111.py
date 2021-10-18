# Generated by Django 3.2.8 on 2021-10-17 18:11

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0003_sectionfilter_filter_section'),
    ]

    operations = [
        migrations.AlterField(
            model_name='object',
            name='object_name',
            field=models.CharField(max_length=50, verbose_name='Имя объекта'),
        ),
        migrations.AlterField(
            model_name='object',
            name='object_section',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='main.section', verbose_name='Раздел объекта'),
        ),
        migrations.AlterField(
            model_name='section',
            name='section_name',
            field=models.CharField(max_length=50, verbose_name='Имя раздела'),
        ),
        migrations.AlterField(
            model_name='sectionfilter',
            name='filter_name',
            field=models.CharField(max_length=50, verbose_name='Название фильтра'),
        ),
        migrations.AlterField(
            model_name='sectionfilter',
            name='filter_section',
            field=models.OneToOneField(default=None, on_delete=django.db.models.deletion.CASCADE, to='main.section', verbose_name='Раздел, в котором будет доступен фильтр'),
        ),
        migrations.AlterField(
            model_name='sectionfilter',
            name='filter_type',
            field=models.CharField(choices=[('MUL', 'Множественный выбор'), ('SNGL', 'Единичный выбор')], max_length=30, verbose_name='Тип фильтра'),
        ),
        migrations.CreateModel(
            name='ObjectAttribute',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('attribute_value', models.CharField(max_length=50)),
                ('attibute_type', models.OneToOneField(default=None, on_delete=django.db.models.deletion.CASCADE, to='main.sectionfilter', verbose_name='Характеристика')),
            ],
            options={
                'verbose_name': 'Характеристика объекта',
                'verbose_name_plural': 'Характеристики объекта',
            },
        ),
    ]
