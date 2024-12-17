import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";


function CreateInventory() {
    const [color, setColor] = useState("");
    const [year, setYear] = useState("");
    const [vin, setVin] = useState("");
    const navigate = useNavigate();
    const [model, setModel] = useState("");
    const [models, setModels] = useState([]);


    useEffect(() => {
        const fetchModels = async () => {
            try {
                const response = await fetch("http://localhost:8100/api/models/");
                    if (response.ok) {
                        const data = await response.json();
                        setModels(data.models);
                    } else {
                        console.error("Failed to fetch models");
                    }
                } catch (error) {
                        console.error("Error fetching models:", error);
                    }
                };

                fetchModels();
            }, []);

            const handleSubmit = async (event) => {
                event.preventDefault();

                setColor("");
                setYear("");
                setVin("");
                setModel("");
                alert("Inventory created successfully!");
                navigate("/automobiles");
                try {
                    const response = await fetch("http://localhost:8100/api/automobiles/", {
                        method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        color,
                        year: parseInt(year, 10),
                        vin,
                        model_id: parseInt(model, 10),
                    }),
                });

                if (response.ok) {
                    setColor("");
                    setYear("");
                    setVin("");
                    setModel("");
                } else {
                    console.error("Failed to create automobile");
                }
            } catch (error) {
                console.error("Error creating automobile:", error);
            }
        };


    return (
        <div className="shadow p-4 mt-4">
        <form onSubmit={handleSubmit}>
            <h2 className="mb-4">Add New Inventory</h2>
            <div className="form-floating mb-3">

                <input
                    type="text"
                    id="color"
                    value={color}
                    className="form-control"
                    onChange={(e) => setColor(e.target.value)}
                    required
                />
                <label htmlFor="color" className="form-label">Color</label>
            </div>
            <div className="form-floating mb-3">

                <input
                    type="number"
                    id="year"
                    value={year}
                    className="form-control"
                    onChange={(e) => setYear(e.target.value)}
                    required
                />
                <label htmlFor="year" className="form-label">Year</label>
            </div>
            <div className="form-floating mb-3">

                <input
                    type="text"
                    id="vin"
                    value={vin}
                    className="form-control"
                    onChange={(e) => setVin(e.target.value)}
                    required
                />
                <label htmlFor="vin" className="form-label">VIN</label>
            </div>
            <div className="form-floating mb-3">
            <label htmlFor="model" className="form-label"></label>
                <select
                    id="model"
                    value={model}
                    className="form-control"
                    onChange={(e) => setModel(e.target.value)}
                    required
                >
                    <option value="">Select Model</option>
                    {models.map((model) => (
                        <option key={model.id} value={model.id}>
                            {model.name}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit" className="btn btn-primary">Add Vehicle</button>
        </form>
        </div>
    );
}

export default CreateInventory;


