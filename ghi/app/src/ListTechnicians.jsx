import { useState, useEffect } from "react";

function TechnicianList() {
    const [technicians, setTechnicians] = useState([]);

    const fetchTechnicians = async () => {
        const url = "http://localhost:8080/api/technicians/";
        try {
            const response = await fetch(url);
            const data = await response.json();
            setTechnicians(data.technician);
            } catch (error) {
                console.error(error);
            }
        };
    useEffect(() => {
        fetchTechnicians();
    }, []);

    return (
        <div>
            <h1>Technicians</h1>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Employee ID</th>
                    </tr>
                </thead>
                <tbody>
                    {technicians.map((technician) => (
                        <tr key={technician.id}>
                            <td>{technician.first_name}</td>
                            <td>{technician.last_name}</td>
                            <td>{technician.employee_id}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TechnicianList;

