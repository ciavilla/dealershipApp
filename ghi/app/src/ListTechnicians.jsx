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

        const deleteTechnician = async (id) => {
            const url = `http://localhost:8080/api/technicians/${id}/`;
            try {
                const response = await fetch(url, {
                    method: "DELETE",
                });
                if (!response.ok) {
                    throw new Error("Failed to delete technician");
                }
                // Update state to remove deleted technician
                setTechnicians((prevTechnicians) =>
                    prevTechnicians.filter((technician) => technician.id !== id)
                );
            } catch (error) {
                console.error("Error deleting technician:", error);
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
                            <td>
                            <button
                                className="btn btn-danger btn-sm"
                                onClick={() => deleteTechnician(technician.id)}
                            >
                                Delete
                            </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TechnicianList;

