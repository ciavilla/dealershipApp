import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddTechnician() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [employeeId, setEmployeeId] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch("http://localhost:8080/api/technicians/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json", },
                body: JSON.stringify({
                    first_name: firstName,
                    last_name: lastName,
                    employee_id: parseInt(employeeId, 10),
                }),
            });

            if (response.ok) {
                setFirstName("");
                setLastName("");
                setEmployeeId("");
                alert("Technician Created successfully!");
                navigate("/technicians");
            }
        } catch (error) {
            console.error("Error creating technician:", error);
        }
    };

    return (
        <div className="shadow p-4 mt-4">
        <form onSubmit={handleSubmit}>
            <h2 className="mb-4">Add A Technician</h2>
            <div className="form-floating mb-3">

                <input
                    type="text"
                    id="firstname"
                    value={firstName}
                    className="form-control"
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
                <label htmlFor="firstname" className="form-label">First Name...</label>
            </div>
            <div className="form-floating mb-3">

                <input
                    type="text"
                    id="lastname"
                    value={lastName}
                    className="form-control"
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
                <label htmlFor="lastname" className="form-label">Last Name...</label>
            </div>
            <div className="form-floating mb-3">

                <input
                    type="number"
                    id="employeeId"
                    className="form-control"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    required
                />
                <label htmlFor="employeeId" className="form-label">Employee Id</label>
            </div>
            <button type="submit" className="btn btn-primary">Create</button>
        </form>
        </div>
    )
}

export default AddTechnician;
