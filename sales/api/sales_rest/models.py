from django.db import models

class Salesperson(models.Model):
    first_name = models.CharField(max_length=(50))
    last_name = models.CharField(max_length=(50))
    employee_id = models.CharField(max_length=(10))


class Customer(models.Model):
    first_name = models.CharField(max_length=(50))
    last_name = models.CharField(max_length=(50))
    address = models.CharField(max_length=(200))
    phone_number = models.CharField(max_length=(10))


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    sold = models.BooleanField(default=False)


class Sale(models.Model):
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="sales",
        on_delete=models.CASCADE,
    )
    salesperson = models.ForeignKey(
        Salesperson,
        related_name="sales",
        on_delete=models.CASCADE,
    )
    customer = models.ForeignKey(
        Customer,
        related_name="sales",
        on_delete=models.CASCADE,
    )
    price = models.PositiveBigIntegerField()
