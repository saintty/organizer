# Generated by Django 4.2.7 on 2024-03-13 13:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('event', '0002_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='start_time',
            field=models.DateTimeField(verbose_name='Дата начала'),
        ),
    ]
