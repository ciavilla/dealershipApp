from django.urls import path
from .views import salespeople_view, salespeople_delete, customers_view, customers_delete, sales_view, sales_delete

urlpatterns = [
    path('salespeople/', salespeople_view, name="salespeople_view"),
    path('salespeople/<int:id>/', salespeople_delete, name="salespeople_delete"),
    path('customers/', customers_view, name="customers_view"),
    path('customers/<int:id>', customers_delete, name="customers_delete"),
    path('sales/', sales_view, name="sales_view"),
    path('sales/<int:id>', sales_delete, name="sales_delete"),
]
