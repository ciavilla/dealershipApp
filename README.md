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


### URLs and Ports

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
http://localhost:8080/api/appointments/3/cancel/
| Update Status canceled | PUT |
http://localhost:8080/api/appointments/3/cancel/




