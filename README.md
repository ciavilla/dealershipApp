# CarCar
CarCar is a application for a car dealership to manage all entities of a car dealership Sales, Service, and Inventory.

Team:

* Ciera Villalpando - Service Microservice
* David Iukuridze- Sales Microservice

## How to Run this App
**Ensure that you have Docker, Git, and Node.js 18.2 or above**
1. Fork the repository.
    https://gitlab.com/davidiukuridze/project-beta.git
2. Clone the repository on your local machine.
3. Build and run the project using Docker with these commands
    docker volume create beta-data
    docker-compose build
    docker-compose up
-View the project in your browser:
    http://localhost:5173

![Img]

## Design
CarCar entails 3 microservices Inventory, Services and Sales. They all interact with each other by use of a poller.

## Diagram
![IMG](./images/CarCar.png)


## Integration
CarCar thrives on teamwork! Here's how our domains work together:
Inventory Domain: Maintains records for all wehicles available for sale. This data is shared between Sales and Service domains via a poller, ensuring that Sales and Service teams have up-to-date information.
Sales Domain: Tracks vehivle sales, assigns VIP status, and shares this data with the Service domain to manage customer perks.
Service Domain: Uses inventory and sales data to schedule appointments, check VIP status, and maintain service history for each vehicle.

## URLs and Ports to send and view data with insomnia or your browser.

### Manufacturers:
| List Manufacturers | GET |
http://localhost:8100/api/manufacturers/
| Create Manufacturer | POST |
http://localhost:8100/api/manufacturers/
| Get Details of Manufacturer| Get |
http://localhost:8100/api/manufacturers/:id/
| Update a Manufacturer | PUT |
http://localhost:8100/api/manufacturers/:id/
| Delete a Manufacturer | DELETE |
http://localhost:8100/api/manufacturers/:id/

JSON body to send data:

Create / Update Manufacturer : Note you can not make duplicates:
```
{
	"name": "Tesla"
}
```
The Return value expected when creating, updating, and viewing a single Manufacturer:
```
{
	"href": "/api/manufacturers/6/",
	"id": 6,
	"name": "Tesla"
}
```
List Manufacturers expected return value:
```
{
	"href": "/api/manufacturers/2/",
	"id": 2,
	"name": "Toyota"
}
```

### Vehicle Models:


### Automobiles:
| List Automobiles | GET |
http://localhost:8100/api/automobiles/
| Create Automobile | CREATE |
http://localhost:8100/api/automobiles/
| Get a specific Automobile | GET |
http://localhost:8100/api/automobiles/:vin/
| Update a Automobile | PUT |
http://localhost:8100/api/automobiles/:vin/
| Delete a Automobile | DELETE |
http://localhost:8100/api/automobiles/:vin/

JSON body to send data:

Create Automobile :
```
{
    "color": "Red",
    "year": 2023,
    "vin": "1HGCM82633A123456",
    "model_id": 5
}
```
Update Automobile :
```
{
  "color": "red",
  "year": 2012,
  "sold": true
}
```
Return for creating or updating Automobile :
```
{
	"href": "/api/automobiles/1234567X912435678/",
	"id": 1,
	"color": "Yellow",
	"year": 2003,
	"vin": "1234567X912435678",
	"model": {
		"href": "/api/models/1/",
		"id": 1,
		"name": "Sierra",
		"picture_url": "https://www.chevrolet.com/content/dam/chevrolet/na/us/english/index/vehicles/2025/trucks/silverado-ld/mov/02-images/zr2/2025-ldretail-zr2-01-v03.jpg?imwidth=960",
		"manufacturer": {
			"href": "/api/manufacturers/5/",
			"id": 5,
			"name": "Chevrolet"
			}
		},
		"sold": false
}
```

Return for Getting the details of a specific Automobile by Vin:
Example URL: http://localhost:8100/api/automobiles/specificVin/

```
{
	"href": "/api/automobiles/1234567X912435678/",
	"id": 1,
	"color": "Yellow",
	"year": 2003,
	"vin": "1234567X912435678",
	"model": {
		"href": "/api/models/1/",
		"id": 1,
		"name": "Sierra",
		"picture_url": "https://www.chevrolet.com/content/dam/chevrolet/na/us/english/index/vehicles/2025/trucks/silverado-ld/mov/02-images/zr2/2025-ldretail-zr2-01-v03.jpg?imwidth=960",
		"manufacturer": {
			"href": "/api/manufacturers/5/",
			"id": 5,
			"name": "Chevrolet"
		}
	},
	"sold": false
}
```

Return for List of Automobiles
```
{
	"autos": [
		{
			"href": "/api/automobiles/1234567X912435678/",
			"id": 1,
			"color": "Yellow",
			"year": 2003,
			"vin": "1234567X912435678",
			"model": {
				"href": "/api/models/1/",
				"id": 1,
				"name": "Sierra",
				"picture_url": "https://www.chevrolet.com/content/dam/chevrolet/na/us/english/index/vehicles/2025/trucks/silverado-ld/mov/02-images/zr2/2025-ldretail-zr2-01-v03.jpg?imwidth=960",
				"manufacturer": {
					"href": "/api/manufacturers/5/",
					"id": 5,
					"name": "Chevrolet"
				}
			},
			"sold": false
		}
	]
}
```
# Sales Microservice

### Customers:

### Salespeople:

### Salesrecords:

# Service Microservice
The Service Microservice is designed to enhance customer satisfaction by providing vehicle service history and status. It seemlessly integrates with other CarCar domains to track vehicle history and maintain service records.
Features of the Service Microservice:
-VIP Program: Customers who purchase a vehicle from us automaticallybecome VIPs. Enjoying free oil change for life, complimentary neck massages, and unlimited free car washes.
-Service Appointments: Customers can schedule service appointments with ease.

### Technicians:
| List technicians | GET |
http://localhost:8080/api/technicians/
|Create Technician | POST |
http://localhost:8080/api/technicians/
|Delete Technician | DELETE |
http://localhost:8080/api/technicians/id/

JSON body to send data:
Create a Technician:
```
{
	"first_name": "Jane",
	"last_name": "Doe",
	"employee_id": "12967"
}
```
Response when Getting a List of Technicians:
```
{
	"technician": [
		{
			"first_name": "Jane",
			"last_name": "Doe",
			"employee_id": "1234235",
			"id": 1
		}
	]
}
```

### Service Appointments:
| List Appointments | GET |
http://localhost:8080/api/appointments/
| Create Appointment | POST |
http://localhost:8080/api/appointments/
| Delete Appointment | DELETE |
http://localhost:8080/api/technicians/id/
| Update Status finished | PUT |
http://localhost:8080/api/appointments/3/finish/
| Update Status canceled | PUT |
http://localhost:8080/api/appointments/3/cancel/

JSON body to send data:

Create Appointment:
```
{
	"date": "2024-12-12",
	"time": "14:30",
  "reason": "Routine maintenance",
  "status": "scheduled",
  "vin": "1HGCM82633A123456",
  "customer": "Jane Smith",
  "technician": 3

}
```
Set status to finished or canceled:
```
{
  "status": "finished"
}
```
Return response Apoointments List:
```
{
	"appointments": [
		{
			"id": 2,
			"date": "2024-12-12",
			"time": "09:00:00",
			"reason": "Routine maintenance",
			"status": "scheduled",
			"vin": "1HGCM82633A123456",
			"customer": "Jane Smith",
			"technician": {
				"first_name": "Sara",
				"last_name": "Villa",
				"employee_id": "1234235",
				"id": 1
			},
			"is_vip": false
		}
	]
}
```
