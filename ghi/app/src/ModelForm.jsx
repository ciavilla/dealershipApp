import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ModelForm() {
    const [ manufacturers, setManufacturers ] = useState([])
    const [ model, setModel ] = useState("")
    const [ pictureURL, setPictureURL ] = useState("")
    const [ selectedManufacturer, setSelectedManufactuere ] = useState("")
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
        const data = {
            "name" : model,
            "picture_url" : pictureURL,
            "manufacturer_id" : selectedManufacturer
        }
        const url = "http://localhost:8100/api/models/"
        try {
            const response = await fetch(url, {
                method : "POST",
                body : JSON.stringify(data),
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

    const handleModel = (event) => {
        setModel(event.target.value)
    }

    const handlePictureURL = (event) => {
        setPictureURL(event.target.value)
    }

    const handleSelectedManufacturer = (event) => {
        setSelectedManufactuere(event.target.value)
    }

    const resetForm = () => {
        setModel("")
        setPictureURL("")
        setSelectedManufactuere("")
    }

    return (
        <div className="shadow p-4 mt-4 ">
            <form onSubmit={handleSubmit}>
                <h1>Create a vehicle model</h1>
                <div className="form-floating mb-3">
                    <input
                        onChange={handleModel}
                        required
                        placeholder="Model name..."
                        type="text"
                        className="form-control"
                        id="model"
                        value={model}
                    />
                    <label htmlFor="model">Model name...</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        onChange={handlePictureURL}
                        required
                        placeholder="Picture URL..."
                        type="url"
                        className="form-control"
                        id="pictureURL"
                        value={pictureURL}
                    />
                    <label htmlFor="pictureURL" className="form-label">Picture URL...</label>
                </div>
                <div className="mb-3">
                    <select
                        onChange={handleSelectedManufacturer}
                        required
                        name="manufacturer"
                        id="manufacturer"
                        className="form-select"
                        value={selectedManufacturer}
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
