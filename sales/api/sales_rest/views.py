from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from common.json import ModelEncoder
from .models import Salesperson, Customer, Sale, AutomobileVO
from django.http import JsonResponse
import json
import requests

class SalespeopleEncoder(ModelEncoder):
    model = Salesperson
    properties = (
        "id",
        "first_name",
        "last_name",
        "employee_id",
    )

@require_http_methods(["GET", "POST"])
def salespeople_view(request):
    if request.method == "GET":
        try:
            data = Salesperson.objects.all()
            return JsonResponse(
                {"salespeople": data},
                encoder=SalespeopleEncoder,
            )
        except Exception as error:
            return JsonResponse(
                {"error" : str(error)},
                status=400
            )
    else:
        try:
            content = json.loads(request.body)
            new_salesperson = Salesperson.objects.create(**content)
            return JsonResponse(
                {"newsalesperson" : new_salesperson},
                encoder=SalespeopleEncoder,
            )
        except:
            return JsonResponse(
                {"error" : "no sales person was created."},
                status=400
            )

@require_http_methods(["DELETE"])
def salespeople_delete(request, id):
    if request.method == "DELETE":
        try:
            person_to_delete = Salesperson.objects.get(id=id)
            count, _ = person_to_delete.delete()
            return JsonResponse(
                {"deleted" : count > 0}
            )
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"error": "sales person does not exist."},
                status=404
            )
    else:
        return JsonResponse(
            {"error" : "the used method is not allowed."},
            status=405
        )


class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = (
        "id",
        "first_name",
        "last_name",
        "address",
        "phone_number",
    )

@require_http_methods(["GET", "POST"])
def customers_view(request):
    if request.method == "GET":
        try:
            data = Customer.objects.all()
            return JsonResponse(
                {"customers": data},
                encoder=CustomerEncoder
            )
        except Exception as error:
            return JsonResponse(
                {"error": str(error)},
                status=400
            )
    elif request.method == "POST":
        try:
            data = json.loads(request.body)
            new_customer = Customer.objects.create(**data)
            return JsonResponse(
                {"customer": new_customer},
                encoder=CustomerEncoder
            )
        except Exception as error:
            return JsonResponse(
                {"error": str(error)},
                status=400
            )

@require_http_methods(["PUT"])
def customer_update(request, id):
    try:
        customer = Customer.objects.get(id=id)
        data = json.loads(request.body)
        for field, value in data.items():
            if hasattr(customer, field):
                setattr(customer, field, value)
        customer.save()
        return JsonResponse(
            {"customer": customer},
            encoder=CustomerEncoder
        )
    except Customer.DoesNotExist:
        return JsonResponse(
            {"error": f"Customer with id {id} does not exist."},
            status=404
        )
    except Exception as error:
        return JsonResponse(
            {"error": str(error)},
            status=400
        )

@require_http_methods(["DELETE"])
def customers_delete(request, id):
    try:
        customer = Customer.objects.get(id=id)
        count, _ = customer.delete()
        return JsonResponse(
            {"deleted": count > 0}
        )
    except Customer.DoesNotExist:
        return JsonResponse(
            {"error": f"Customer with id {id} does not exist."},
            status=404
        )
    except Exception as error:
        return JsonResponse(
            {"error": str(error)},
            status=400
        )



class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = (
        "vin",
        "sold",
    )


class SalesEncoder(ModelEncoder):
    model = Sale
    properties = (
        "id",
        "automobile",
        "salesperson",
        "customer",
        "price",
    )
    encoders = {
        "automobile" : AutomobileVOEncoder(),
        "salesperson" : SalespeopleEncoder(),
        "customer" : CustomerEncoder(),
    }


@require_http_methods(["GET", "POST"])
def sales_view(request):
    if request.method == "GET":
        try:
            data = Sale.objects.all()
            return JsonResponse(
                {"sales" : data},
                encoder=SalesEncoder
            )
        except Exception as error:
            return JsonResponse(
                {"error" : str(error)},
                status=400
            )
    else:
        try:
            data = json.loads(request.body)
            automobile_vin = data["automobile"]
            if Sale.objects.filter(automobile__vin=automobile_vin).exists():
                return JsonResponse(
                    {"error" : "Vehicle has already been sold."},
                    status=400
                )
            else:
                data["automobile"] = AutomobileVO.objects.get(vin=data["automobile"])
                data["salesperson"] = Salesperson.objects.get(id=data["salesperson"])
                data["customer"] = Customer.objects.get(id=data["customer"])

                response = requests.put(f"http://inventory-api:8000/api/automobiles/{automobile_vin}/", json={"sold": True})

                new_sale = Sale.objects.create(**data)

                if response.status_code == 200:
                    return JsonResponse(
                        {"new_sale" : new_sale},
                        encoder=SalesEncoder
                    )
                else:
                    new_sale.delete()
                    return JsonResponse(
                        {"error" : "Was unable to update automobile status, aborted creating sale."},
                        status=400
                    )
        except AutomobileVO.DoesNotExist:
            return JsonResponse( {"error": "Automobile not found."}, status=404 )
        except Salesperson.DoesNotExist:
            return JsonResponse( {"error": "Salesperson not found."}, status=404 )
        except Customer.DoesNotExist:
            return JsonResponse( {"error": "Customer not found."}, status=404 )
        except Exception as e:
            return JsonResponse( {"error": str(e)}, status=400)

@require_http_methods(["DELETE"])
def sales_delete(request, id):
    if request.method == "DELETE":
        try:
            sale = Sale.objects.get(id=id)
            count, _ = sale.delete()
            return JsonResponse(
                {"deleted" : count > 0}
            )
        except Exception as error:
            return JsonResponse(
                {"error" : str(error)},
                status=400
            )
