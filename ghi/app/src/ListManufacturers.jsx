import { useEffect, useState } from "react";

function ListManufacturers() {
    const [manufacturers, setManufacturers] = useState([]);


    useEffect(() => {
        const fetchManufacturers = async () => {
            try {
                const response = await fetch("http://localhost:8100/api/manufacturers/");
                if (!response.ok) {
                    throw new Error("Failed to fetch shoes");
                }
                const data = await response.json();
                setManufacturers(data.manufacturers);
            } catch (error) {
                console.error("Error fetching shoes:", error);
            }finally {
                setLoading(false);
            }
        };
        fetchManufacturers();
    }, []);

    return (
        <div className="container my-4">
            <h1 className="mb-4" >Manufacturers</h1>
            <ul>
                {manufacturers.map((manufacturer) => (
                    <li key={manufacturer.id}>{manufacturer.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default ListManufacturers;
