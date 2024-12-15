import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateInventory() {
    const [color, setColor] = useState("");
    const [year, setYear] = useState("");
    const [vin, setVin] = useState("");
    const [modelId, setModelId] = useState("");
    const navigate = useNavigate();

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
                    model_id: parseInt(modelId, 10),
                }),
            });

            if (response.ok) {

                setColor("");
                setYear("");
                setVin("");
                setModelId("");
                alert("Inventory created successfully!");
                navigate("/automobiles");
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
                <label htmlFor="modelId" className="form-label">Model ID</label>
                <input
                    type="number"
                    id="modelId"
                    value={modelId}
                    onChange={(e) => setModelId(e.target.value)}
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary">Add Vehicle</button>
        </form>
    );
}

export default CreateInventory;


