import { useState, useEffect } from "react";

function CreateServiceAppointment() {
    const [vin, setVin] = useState("");
    const [customer, setCustomer] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [technician, setTechnician] = useState("");
    const [reason, setReason] = useState("");
    const [technicians, setTechnicians] = useState([]);

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
            }
        } catch (error) {
            console.error("Error creating appointment:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="mb-4">Creae Service Appointment</h2>
            <div className="mb-4">
                <label htmlFor="vin" className="form-label">VIN</label>
                <input
                    type="text"
                    id="vin"
                    value={vin}
                    onChange={(e) => setVin(e.target.value)}
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="customer" className="form-label">Customer</label>
                <input
                    type="text"
                    id="customer"
                    value={customer}
                    onChange={(e) => setCustomer(e.target.value)}
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="date" className="form-label">Date</label>
                <input
                    type="date"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="time" className="form-label">Time</label>
                <input
                    type="time"
                    id="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="technician" className="form-label">Technician</label>
                <select
                    id="technician"
                    value={technician}
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
            <div className="mb-4">
                <label htmlFor="reason" className="form-label">Reason</label>
                <textarea
                    id="reason"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary">Create</button>
        </form>
    );
}

export default CreateServiceAppointment;
