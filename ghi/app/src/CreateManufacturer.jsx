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
                alert("Manufacturer Cretated Successfully!")
                navigate("/manufacturers");
            }
         } catch (error) {
            console.error("Error creating manufacturer", error);
         }
    };

    return (
            <form onSubmit={handleSubmit}>
                <h2 className="mb-4">Create A Manufacturer</h2>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        id="name"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Create</button>
            </form>

    );
}

export default CreateManufacturer;
