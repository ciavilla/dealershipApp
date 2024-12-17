import { useEffect, useState } from "react";

function ServiceAppointments() {
    const [appointments, setAppointments] = useState([]);

    const fetchAppointments = async () => {
        const url = "http://localhost:8080/api/appointments/";
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error: Status: $resonse.status`);
            }
            const data = await response.json();

            const activeAppointments = data.appointments.filter(
                appointment => !["canceled", "finished"].includes(appointment.status)
            );
            setAppointments(activeAppointments);
        } catch (error) {
            console.error("Error fetching appointments", error);
        }
    };


    const updateAppointmentStatus = async (id, action) => {
        const url = `http://localhost:8080/api/appointments/${id}/${action}/`;
        try {
            const response = await fetch(url, { method: "PUT" });
            if (response.ok) {
                fetchAppointments();
            } else {
                console.error("Error updating appointments status");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        fetchAppointments();

    }, []);

    return (
        <div>
            <h1>Service Appointments</h1>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>VIN</th>
                        <th>Customer</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Technician</th>
                        <th>Reason</th>
                        <th>VIP</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((appointment) => {

                        return (
                        <tr
                            key={`appointment-${appointment.id}`}
                            className={appointment.vip_status ? "table-warning" : ""}
                        >
                            <td>{appointment.vin}</td>
                            <td>{appointment.customer}</td>
                            <td>{appointment.date}</td>
                            <td>{appointment.time}</td>
                            <td>{`${appointment.technician.first_name} ${appointment.technician.last_name}`}</td>
                            <td>{appointment.reason}</td>
                            <td>{appointment.vip_status ? (
                                <span className="badge bg-warning text-dark">VIP</span>
                                ) : (
                                    "No"
                                )}
                            </td>
                            <td>
                                <div className="btn-group" role="group">
                                <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => updateAppointmentStatus(appointment.id, "cancel")}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="btn btn-success btn-sm"
                                    onClick={() => updateAppointmentStatus(appointment.id, "finish")}
                                >
                                    Finish
                                </button>
                                </div>
                            </td>
                        </tr>
                    );
})}
                </tbody>
            </table>
        </div>
    );
}

export default ServiceAppointments;
