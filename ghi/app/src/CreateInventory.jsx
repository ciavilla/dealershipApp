import { useState, useEffect } from "react";

function CreateInventory() {
    const [color, setColor] = useState("");
    const [year, setYear] = useState("");
    const [vin, setVin] = useState("");
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
        <form onSubmit={handleSubmit}>
            <h2 className="mb-4">Add New Inventory</h2>
            <div className="mb-3">
                <label htmlFor="color" className="form-label">Color</label>
                <input
                    type="text"
                    id="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="year" className="form-label">Year</label>
                <input
                    type="number"
                    id="year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="vin" className="form-label">VIN</label>
                <input
                    type="text"
                    id="vin"
                    value={vin}
                    onChange={(e) => setVin(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <label htmlFor="model" className="form-label">Model</label>
                <select
                    id="model"
                    value={model}
                    onChange={(e) => setModel(e.target.value)}
                    required
                >
                    <option value="">Select a model</option>
                    {models.map((model) => (
                        <option key={model.id} value={model.id}>
                            {model.name}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit" className="btn btn-primary">Add Vehicle</button>
        </form>
    );
}

export default CreateInventory;


