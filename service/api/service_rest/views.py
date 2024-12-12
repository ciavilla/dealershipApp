from django.shortcuts import render
import json
from django.http import JsonResponse, HttpResponse
from django.views.decorators.http import require_http_methods
from common.json import ModelEncoder
from .models import Technician, AutomobileVO, Appointment

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
        "date",
        "time",
        "reason",
        "status",
        "vin",
        "customer",
        "technician"
    ]
    encoders = {
        "technician": TechnicianEncoder(),
    }


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
        appointments = Appointment.objects.all()
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
        if request.method == "DELETE":
            appointment = Appointment.objects.get(id=id)
            appointment.delete()
            return HttpResponse(status=204)
        elif request.method == "PUT":
            appointment = Appointment.objects.get(id=id)
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
