import { useState } from "react";
import { useNavigate } from "react-router-dom";

function CreateManufacturer() {
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
         try {
            const response = await fetch("http://localhost:8100/api/manufacturers/", {
                method: "POST",
                headers: { "Content-Type": "application/json", },
                body: JSON.stringify({ name }),
            });

            if (response.ok) {
                setName("");
                navigate("/manufacturers");
            }
         } catch (error) {
            console.error("Error creating manufacturer", error);
         }
    };

    return (
        <div className="shadow p-4 mt-4">
            <form onSubmit={handleSubmit}>
                <h2 className="mb-4">Create A Manufacturer</h2>
                <div className="form-floating mb-3">

                    <input
                        type="text"
                        id="name"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <label htmlFor="name" className="form-label">Name...</label>
                </div>
                <button type="submit" className="btn btn-primary">Create</button>
            </form>
        </div>

    );
}

export default CreateManufacturer;
