import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SalespersonForm() {
    const [ firstname, setFirstName ] = useState('')
    const [ lastname, setLastName ] = useState('')
    const [ employeeID, setEmployeeID ] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault()
        const data = {
            "first_name" : firstname,
            "last_name" : lastname,
            "employee_id" : employeeID
        }
        try {
            const request = fetch("http://localhost:8090/api/salespeople/", {
                method: "POST",
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify(data)
            })
            resetForm()
            navigate("/salespeople")
        } catch(error){
            console.error(error)
        }
    }

    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value)
    }

    const handleLastNameChange = (event) => {
        setLastName(event.target.value)
    }

    const handleEmployeeIDChange = (event) => {
        setEmployeeID(event.target.value)
    }

    const resetForm = () => {
        setFirstName("")
        setLastName("")
        setEmployeeID("")
    }

    return (
        <div className="shadow p-4 mt-4 ">
            <form onSubmit={handleSubmit}>
                <h1>Add a Salesperson</h1>
                <div className="form-floating mb-3">
                    <input
                        onChange={handleFirstNameChange}
                        required
                        placeholder="First name..."
                        type="text"
                        className="form-control"
                        id="firstname"
                        value={firstname}
                    />
                    <label htmlFor="firstname">First Name...</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        onChange={handleLastNameChange}
                        required
                        placeholder="Last name..."
                        type="text"
                        className="form-control"
                        id="lastname"
                        value={lastname}
                    />
                    <label htmlFor="lastname" className="form-label">Last name...</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        onChange={handleEmployeeIDChange}
                        required
                        placeholder="Employee ID..."
                        type="text"
                        className="form-control"
                        id="employeeID"
                        value={employeeID}
                    />
                    <label htmlFor="employeeID" className="form-label">Employee ID...</label>
                </div>
                <button type="submit" className="btn btn-primary">Create</button>
            </form>
        </div>
    )
}

export default SalespersonForm;
