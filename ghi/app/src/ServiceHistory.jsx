import { useState, useEffect } from "react";

function ServiceHistory() {
    const [appointments, setAppointments] = useState([]);
    const [filteredAppointments, setFilteredAppointments] = useState([]);
    const [vinSearch, setVinSearch] = useState("");

    const fetchAppointments = async () => {
        const url = "http://localhost:8080/api/appointments/";
        try {
            const response = await fetch(url);

            if (!response.ok) {
                throw new Error(`HTTP error! status: %{response.status}`);
            }

            const data = await response.json();
            setAppointments(data.appointments);
            setFilteredAppointments(data.appointments);
        } catch (error) {
            console.error("Fetch error:", error);
        }
    };

    useEffect(() => {
        fetchAppointments();
    }, []);

    const handleVinSearch = (e) => {
        e.preventDefault();

        const filtered = appointments.filter(appointment =>
            appointment.vin.toLowerCase().includes(vinSearch.toLowerCase())
        );

        setFilteredAppointments(filtered);
    };

        const resetSearch = () => {
            setVinSearch("");
            setFilteredAppointments(appointments);
        };

        return (
            <div className="container mt-4">
                <h1 className="input-group">Service History</h1>

                <form onSubmit={handleVinSearch} className="mb-4">
                    <div className="input-group">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search by VIN"
                            value={vinSearch}
                            onChange={(e) => setVinSearch(e.target.value)}
                        />
                        <div className="input-group-append">
                            <button
                                type="submit"
                                className="btn btn-primary"
                            >
                                Search
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={resetSearch}
                            >
                                Reset
                            </button>
                        </div>
                    </div>
                </form>

                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                            <th>VIN</th>
                            <th>VIP</th>
                            <th>Customer</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Technician</th>
                            <th>Reason</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredAppointments.map((appointment) => (
                            <tr key={`appointment-${appointment.id}`}>
                                <td>{appointment.vin}</td>
                                <td>{appointment.vip_status ? (
                                <span className="badge bg-warning text-dark">VIP</span>
                                ) : (
                                    "No"
                                )}</td>
                                <td>{appointment.customer}</td>
                                <td>{appointment.date}</td>
                                <td>{appointment.time}</td>
                                <td>{`${appointment.technician.first_name} ${appointment.technician.last_name}`}</td>
                                <td>{appointment.reason}</td>
                                <td>{appointment.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {filteredAppointments.length === 0 && (
                    <div className="alert alert-info">
                        No Service Appointments Found
                    </div>
                )}
            </div>
        );
}


export default ServiceHistory;
