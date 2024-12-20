import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ModelForm() {
    const [ manufacturers, setManufacturers ] = useState([])

    const [ formData, setFormData ] = useState({
        name : "",
        picture_url : "",
        manufacturer_id : ""
    })
    const navigate = useNavigate()


    const fetchManufacturer = async () => {
        const url = "http://localhost:8100/api/manufacturers/"
        try {
            const response = await fetch(url)
            const { manufacturers } = await response.json()
            setManufacturers(manufacturers)
        } catch(error) {
            console.error(error)
        }
    }

    useEffect(()=>{fetchManufacturer()}, [])

    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = "http://localhost:8100/api/models/"
        try {
            const response = await fetch(url, {
                method : "POST",
                body : JSON.stringify(formData),
                headers : {"Content-Type": "application/json"}
            })
            if (response.ok) {
                resetForm()
                navigate("/models")
            } else{
                console.log("Form had issue with submission")
            }
        }catch(error){
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
            name : "",
            picture_url : "",
            manufacturer_id : ""
        })
    }

    const { name, picture_url, manufacturer_id } = formData;

    return (
        <div className="shadow p-4 mt-4 ">
            <form onSubmit={handleSubmit}>
                <h1>Create Vehicle Model</h1>
                <div className="form-floating mb-3">
                    <input
                        onChange={handleFormChange}
                        required
                        placeholder="Model name..."
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        name="name"
                    />
                    <label htmlFor="model">Model name...</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        onChange={handleFormChange}
                        required
                        placeholder="Picture URL..."
                        type="url"
                        className="form-control"
                        id="picture_url"
                        value={picture_url}
                        name="picture_url"
                    />
                    <label htmlFor="pictureURL" className="form-label">Picture URL...</label>
                </div>
                <div className="mb-3">
                    <select
                        onChange={handleFormChange}
                        required
                        id="manufacturer_id"
                        className="form-select"
                        value={manufacturer_id}
                        name="manufacturer_id"
                    >
                        <option >Choose a manufacturer...</option>
                        {manufacturers.map((manufacturer)=>
                            <option key={manufacturer.id} value={manufacturer.id}>{manufacturer.name}</option>)}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Create</button>
            </form>
        </div>
    )
}

export default ModelForm;
