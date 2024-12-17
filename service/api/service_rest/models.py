from django.db import models
from datetime import date, time

# Create your models here.
class Technician(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    employee_id = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    sold = models.BooleanField(default=False)

    def __str__(self):
        return self.vin


class Appointment(models.Model):
    STATUS_CHOICES = [
        ('scheduled', 'Scheduled'),
        ('canceled', 'Canceled'),
        ('finished', 'Finished'),
    ]

    date = models.DateField(default=date.today)
    time = models.TimeField(default=time(9, 0))
    reason = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='scheduled')
    vin = models.CharField(max_length=17)
    customer = models.CharField(max_length=200)
    technician = models.ForeignKey(Technician, on_delete=models.CASCADE)
    vip_status = models.BooleanField(default=False)

    def is_vip(self):
        try:
            return AutomobileVO.objects.filter(
                vin=self.vin,
                sold=True
            ).exists()
        except Exception as e:
            return False

    def save(self, *args, **kwargs):
        self.vip_status = self.is_vip()
        super().save(*args, **kwargs)



    def __str__(self):
        return f"Appointment for {self.vin} with {self.technician}"
