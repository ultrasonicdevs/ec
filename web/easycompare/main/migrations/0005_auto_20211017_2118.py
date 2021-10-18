# Generated by Django 3.2.8 on 2021-10-17 18:18

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0004_auto_20211017_2111'),
    ]

    operations = [
        migrations.AddField(
            model_name='objectattribute',
            name='parent_object',
            field=models.OneToOneField(default=None, on_delete=django.db.models.deletion.CASCADE, to='main.object', verbose_name='Объект'),
        ),
        migrations.AlterField(
            model_name='objectattribute',
            name='attribute_value',
            field=models.CharField(max_length=50, verbose_name='Значение характеристики'),
        ),
    ]
