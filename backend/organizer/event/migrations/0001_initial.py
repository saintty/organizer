# Generated by Django 4.2.7 on 2024-03-13 10:50

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Event',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200, verbose_name='Название')),
                ('description', models.TextField(verbose_name='Описание')),
                ('start_time', models.DateTimeField(auto_now_add=True, verbose_name='Дата начала')),
                ('end_time', models.DateTimeField(verbose_name='Дата окончания')),
                ('priority', models.CharField(choices=[('HIGH', 'Высокий приоритет'), ('MEDIUM', 'Средний приоритет'), ('LOWER', 'Низкий приоритет')], default='HIGH', max_length=50, verbose_name='Приоритет')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Событие', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'Событие',
                'verbose_name_plural': 'События',
            },
        ),
    ]
