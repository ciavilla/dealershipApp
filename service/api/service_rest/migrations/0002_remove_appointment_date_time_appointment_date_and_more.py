# Generated by Django 5.0.7 on 2024-12-12 22:26

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("service_rest", "0001_initial"),
    ]

    operations = [
        migrations.RemoveField(
            model_name="appointment",
            name="date_time",
        ),
        migrations.AddField(
            model_name="appointment",
            name="date",
            field=models.DateField(default=datetime.date.today),
        ),
        migrations.AddField(
            model_name="appointment",
            name="time",
            field=models.TimeField(default=datetime.time(9, 0)),
        ),
    ]