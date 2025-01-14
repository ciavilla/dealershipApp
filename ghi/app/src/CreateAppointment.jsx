import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CreateServiceAppointment() {
    const [vin, setVin] = useState("");
    const [customer, setCustomer] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [technician, setTechnician] = useState("");
    const [reason, setReason] = useState("");
    const [technicians, setTechnicians] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTechnicians = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/technicians/");
                const data = await response.json();
                setTechnicians(data.technician || []);
            } catch (error) {
                console.error("Error fetching technicians:", error);
            }
        };
        fetchTechnicians();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        const formattedTime = time.split(":").slice(0, 2).join(":");

        try {
            const response = await fetch("http://localhost:8080/api/appointments/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    vin: vin.trim(),
                    customer: customer.trim(),
                    date: date,
                    time: formattedTime,
                    technician: parseInt(technician, 10),
                    reason: reason.trim(),
                }),
            });

            if (response.ok) {
                setVin("");
                setCustomer("");
                setDate("");
                setTime("");
                setTechnician("");
                setReason("");
                navigate("/appointments");
            }
        } catch (error) {
            console.error("Error creating appointment:", error);
        }
    };

    return (
        <div className="shadow p-4 mt-4">
            <form onSubmit={handleSubmit}>
                <h2 className="mb-4">Create Service Appointment</h2>
                <div className="form-floating mb-3">

                    <input
                    type="text"
                    id="vin"
                    placeholder="vin"
                    value={vin}
                    className="form-control"
                    onChange={(e) => setVin(e.target.value)}
                    required
                    />
                    <label htmlFor="vin" className="form-label">Vin</label>
                </div>
            <div className="form-floating mb-3">

                <input
                    type="text"
                    id="customer"
                    placeholder="customer"
                    className="form-control"
                    value={customer}
                    onChange={(e) => setCustomer(e.target.value)}
                    required
                />
                <label htmlFor="customer" className="form-label">Customer</label>
            </div>
            <div className="form-floating mb-3">

                <input
                    type="date"
                    id="date"
                    value={date}
                    className="form-control"
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
                <label htmlFor="date" className="form-label"></label>
            </div>
            <div className="form-floating mb-3">
                <label htmlFor="time" className="form-label"></label>
                <input
                    type="time"
                    id="time"
                    value={time}
                    className="form-control"
                    onChange={(e) => setTime(e.target.value)}
                    required
                />
            </div>
            <div className="form-floating mb-3">
                <label htmlFor="technician" className="form-label"></label>
                <select
                    id="technician"
                    value={technician}
                    className="form-control"
                    onChange={(e) => setTechnician(e.target.value)}
                    required
                >
                    <option value="">Select A Technician</option>
                    {technicians.map((technician) => (
                        <option key={technician.id} value={technician.id}>
                            {technician.first_name} {technician.last_name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="form-floating mb-3">

                <textarea
                    id="reason"
                    value={reason}
                    className="form-control"
                    onChange={(e) => setReason(e.target.value)}
                    required
                />
                <label htmlFor="reason" className="form-label">Reason</label>
            </div>
            <button type="submit" className="btn btn-primary">Create</button>
        </form>
        </div>
    );
}

export default CreateServiceAppointment;
