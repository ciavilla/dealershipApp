# Generated by Django 5.0.7 on 2024-12-16 18:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("service_rest", "0003_appointment_is_vip_alter_appointment_vin"),
    ]

    operations = [
        migrations.AlterField(
            model_name="appointment",
            name="vin",
            field=models.CharField(max_length=17),
        ),
    ]
