import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SalespersonForm() {
    const [ formData, setFormData ] = useState({
        first_name: "",
        last_name: "",
        employee_id: ""
    })
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault()
        try {
            const request = fetch("http://localhost:8090/api/salespeople/", {
                method: "POST",
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify(formData)
            })
            resetForm()
            navigate("/salespeople")
        } catch(error){
            console.error(error)
        }
    }

    const handleFormChange = (event) => {
        const value = event.target.value
        const inputName = event.target.name
        setFormData({
            ...formData,
            [inputName]: value
        })
    }

    const resetForm = () => {
       setFormData({
        first_name: "",
        last_name: "",
        employee_id: ""
       })
    }

    const { first_name, last_name, employee_id } = formData

    return (
        <div className="shadow p-4 mt-4 ">
            <form onSubmit={handleSubmit}>
                <h1>Add a Salesperson</h1>
                <div className="form-floating mb-3">
                    <input
                        onChange={handleFormChange}
                        required
                        placeholder="First name..."
                        type="text"
                        className="form-control"
                        id="first_name"
                        value={first_name}
                        name="first_name"
                    />
                    <label htmlFor="firstname">First Name...</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        onChange={handleFormChange}
                        required
                        placeholder="Last name..."
                        type="text"
                        className="form-control"
                        id="last_name"
                        value={last_name}
                        name="last_name"
                    />
                    <label htmlFor="lastname" className="form-label">Last name...</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        onChange={handleFormChange}
                        required
                        placeholder="Employee ID..."
                        type="text"
                        className="form-control"
                        id="employee_id"
                        value={employee_id}
                        name="employee_id"
                    />
                    <label htmlFor="employeeID" className="form-label">Employee ID...</label>
                </div>
                <button type="submit" className="btn btn-primary">Create</button>
            </form>
        </div>
    )
}

export default SalespersonForm;
