import { useEffect, useState } from "react";

function ListManufacturers() {
    const [manufacturers, setManufacturers] = useState([]);


    useEffect(() => {
        const fetchManufacturers = async () => {
            try {
                const response = await fetch("http://localhost:8100/api/manufacturers/");
                if (!response.ok) {
                    throw new Error("Failed to fetch manufacturer");
                }
                const data = await response.json();
                setManufacturers(data.manufacturers);
            } catch (error) {
                console.error("Error fetching manufacturers:", error);
            }
        };
        fetchManufacturers();
    }, []);

    const deleteManufacturer = async (id) => {
        try {
            const response = await fetch(`http://localhost:8100/api/manufacturers/${id}/`, {
                method: "DELETE",
            });
            if (!response.ok) {
                throw new Error("Failed to delete manufacturer");
            }
            // Remove the deleted manufacturer from the local state
            setManufacturers((prevManufacturers) =>
                prevManufacturers.filter((manufacturer) => manufacturer.id !== id)
            );
        } catch (error) {
            console.error("Error deleting manufacturer:", error);
        }
    };
    return (
        <div>
            <h1 className=" mb-4">Manufacturers</h1>
            <ul className="list-group">
                {manufacturers.map((manufacturer) => (
                    <li className="list-group-item d-flex justify-content-between align-items-center"key={manufacturer.id}>
                        {manufacturer.name}
                        <button
                    className="btn btn-danger btn-sm"
                    onClick={() => deleteManufacturer(manufacturer.id)}
                >
                    Delete
                </button>
            </li>
        ))}
            </ul>
        </div>
    );
}

export default ListManufacturers;
