import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CustomersForm() {
    const [ firstname, setFirstName ] = useState('')
    const [ lastname, setLastName ] = useState('')
    const [ address, setAddress ] = useState('')
    const [ phonenumber, setPhoneNumber ] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault()
        const data = {
            "first_name" : firstname,
            "last_name" : lastname,
            "address" : address,
            "phone_number" : phonenumber
        }
        try {
            const request = fetch("http://localhost:8090/api/customers/", {
                method: "POST",
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify(data)
            })
            resetForm()
            navigate("/customers")
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

    const handleAddressChange = (event) => {
        setAddress(event.target.value)
    }

    const handlePhoneNumberChange = (event) => {
        setPhoneNumber(event.target.value)
    }

    const resetForm = () => {
        setFirstName("")
        setLastName("")
        setAddress("")
        setPhoneNumber("")
    }


    return (
        <div className="shadow p-4 mt-4 ">
            <form onSubmit={handleSubmit}>
                <h1>Add a Customer</h1>
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
                        onChange={handleAddressChange}
                        required
                        placeholder="Address..."
                        type="text"
                        className="form-control"
                        id="address"
                        value={address}
                    />
                    <label htmlFor="address" className="form-label">Address...</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        onChange={handlePhoneNumberChange}
                        required
                        placeholder="Phone Number..."
                        type="tel"
                        pattern="[0-9]{10}"
                        className="form-control"
                        id="phonenumber"
                        value={phonenumber}
                    />
                    <label htmlFor="phonenumber" className="form-label">Phone Number...</label>
                </div>
                <button type="submit" className="btn btn-primary">Create</button>
            </form>
        </div>
    )
}

export default CustomersForm;
