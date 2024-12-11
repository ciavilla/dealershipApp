import django
import os
import sys
import time
import traceback
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sales_project.settings")
django.setup()

# Import models from sales_rest, here.
# from sales_rest.models import Something
from sales_rest.models import AutomobileVO

def poll():
    while True:
        print("Sales poller polling for data")
        try:
            url = "http://inventory-api:8000/api/automobiles/"
            response = requests.get(url)
            data = response.json()
            for automobile in data["autos"]:
                AutomobileVO.objects.update_or_create(
                    vin = automobile["vin"],
                    defaults = {
                        "sold": automobile["sold"]
                    }
                )
        except Exception as e:
            traceback.print_exc()
            print(e, file=sys.stderr)

        time.sleep(60)


if __name__ == "__main__":
    poll()
