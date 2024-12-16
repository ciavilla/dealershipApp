import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CustomersForm() {
    const [ formData, setFormData ] = useState({
        first_name: "",
        last_name: "",
        address: "",
        phone_number: ""
    })
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault()
        try {
            const request = fetch("http://localhost:8090/api/customers/", {
                method: "POST",
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify(formData)
            })
            resetForm()
            navigate("/customers")
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
            address: "",
            phone_number: ""
        })
    }

    const { first_name, last_name, address, phone_number } = formData

    return (
        <div className="shadow p-4 mt-4 ">
            <form onSubmit={handleSubmit}>
                <h1>Add a Customer</h1>
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
                        placeholder="Address..."
                        type="text"
                        className="form-control"
                        id="address"
                        value={address}
                        name="address"
                    />
                    <label htmlFor="address" className="form-label">Address...</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        onChange={handleFormChange}
                        required
                        placeholder="Phone Number..."
                        type="tel"
                        pattern="[0-9]{10}"
                        className="form-control"
                        id="phone_number"
                        value={phone_number}
                        name="phone_number"
                    />
                    <label htmlFor="phonenumber" className="form-label">Phone Number...</label>
                </div>
                <button type="submit" className="btn btn-primary">Create</button>
            </form>
        </div>
    )
}

export default CustomersForm;
