from django.shortcuts import render
import json
from django.http import JsonResponse, HttpResponse
from django.views.decorators.http import require_http_methods
from common.json import ModelEncoder
from .models import Technician, AutomobileVO, Appointment
from datetime import time

# Create your views here.
class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "first_name",
        "last_name",
        "employee_id",
        "id"
    ]


class AutomobileEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "sold"
    ]


class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "id",
        "date",
        "time",
        "reason",
        "status",
        "vin",
        "customer",
        "technician",
        "is_vip"
    ]
    encoders = {
        "technician": TechnicianEncoder(),
    }

    def default(self, o):
        if isinstance(o, time):
            return o.strftime("%H:%M:%S")

        if isinstance(o, Appointment):

            return {
                **super().default(o),
                "is_vip": o.is_vip()
            }
        return super().default(o)





#Technician Views
@require_http_methods(["GET", "POST"])
def technician_list(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse({"technician": technicians}, encoder=TechnicianEncoder)
    elif request.method == "POST":
        try:
            content = json.loads(request.body)
            technician = Technician.objects.create(**content)
            return JsonResponse(technician, encoder=TechnicianEncoder, safe=False)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)

@require_http_methods(["DELETE"])
def technician_detail(request, id):
    try:
        technician = Technician.objects.get(id=id)
        technician.delete()
        return HttpResponse(status=204)
    except Technician.DoesNotExist:
        return JsonResponse({"error": "Technician not found"}, status=404)


#Appointments
@require_http_methods(["GET", "POST"])
def appointment_list(request):
    if request.method == "GET":
        status = request.GET.get("status", "scheduled")
        appointments = Appointment.objects.filter(status=status)
        return JsonResponse({"appointments": appointments}, encoder=AppointmentEncoder)
    elif request.method == "POST":
        try:
            content = json.loads(request.body)
            technician_id = content.get("technician")
            content["technician"] = Technician.objects.get(id=technician_id)
            appointment = Appointment.objects.create(**content)
            return JsonResponse(appointment, encoder=AppointmentEncoder, safe=False)
        except Technician.DoesNotExist:
            return JsonResponse({"error": "Technician not found"}, status=400)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)


@require_http_methods(["DELETE", "PUT"])
def appointment_detail(request, id, action=None):
    try:
        appointment = Appointment.objects.get(id=id)
        if request.method == "DELETE":
            appointment.delete()
            return HttpResponse(status=204)
        elif request.method == "PUT":
            if action == "cancel":
                appointment.status = "canceled"
            elif action == "finish":
                appointment.status = "finished"
            else:
                return JsonResponse({"error": "Invalid action"}, status=400)
            appointment.save()
            return JsonResponse(appointment, encoder=AppointmentEncoder, safe=False)
    except Appointment.DoesNotExist:
        return JsonResponse({"error": "Appointment not found"}, status=404)


