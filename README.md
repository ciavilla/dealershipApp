# CarCar

Team:

* Ciera Villalpando - Service Microservice
* David - Sales Microservice

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

## Diagram
![IMG](./images/CarCar.png)

## Design
CarCar entails 3 microservices Inventory, Services and Sales. They all interact with each other by use of a poller.

## Integration


### URLs and Ports to send and view data with insomnia or your browser.
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

### Technicians:
| List technicians | GET |
http://localhost:8080/api/technicians/
|Create Technician | POST |
http://localhost:8080/api/technicians/
|Delete Technician | DELETE |
http://localhost:8080/api/technicians/id/


### Appointments:
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




