from django.db import models

from user.models import User


class Event(models.Model):
    HIGH_PRIORITY = 'HIGH'
    MEDIUM_PRIORITY = 'MEDIUM'
    LOWER_PRIORITY = 'LOWER'

    PRIORITY = [
        (HIGH_PRIORITY, 'Высокий приоритет'),
        (MEDIUM_PRIORITY, 'Средний приоритет'),
        (LOWER_PRIORITY, 'Низкий приоритет'),
    ]

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name="Событие")
    title = models.CharField(max_length=200, verbose_name="Название")
    description = models.TextField(verbose_name="Описание")
    start_time = models.DateTimeField(auto_now_add=True, verbose_name="Дата начала", null=False)
    end_time = models.DateTimeField(verbose_name="Дата окончания", null=False)
    priority = models.CharField(max_length=50, choices=PRIORITY, default=HIGH_PRIORITY, verbose_name="Приоритет")

    class Meta:
        verbose_name = "Событие"
        verbose_name_plural = "События"

    def __str__(self):
        return f'{self.start_time} {self.title}'
