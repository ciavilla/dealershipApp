import { useState } from "react";

function AddTechnician() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [employeeId, setEmployeeId] = useState("");

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
            }
        } catch (error) {
            console.error("Error creating technician:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2 className="mb-4">Add A Technician</h2>
            <div className="mb-4">
                <label htmlFor="firstname" className="form-label">First Name</label>
                <input
                    type="text"
                    id="firstname"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="lastname" className="form-label">Last Name</label>
                <input
                    type="text"
                    id="lastname"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
            </div>
            <div className="mb-4">
                <label htmlFor="employeeId" className="form-label">Employee Id</label>
                <input
                    type="number"
                    id="employeeId"
                    value={employeeId}
                    onChange={(e) => setEmployeeId(e.target.value)}
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary">Create</button>
        </form>
    )
}

export default AddTechnician;
