import { useState, useEffect } from "react"

function ModelList() {
    const [ autos, setAutos ] = useState([]);


    const fetchModels = async () => {
        const url = "http://localhost:8100/api/automobiles/"
        try {
            const request = await fetch(url)
            const { autos } = await request.json()
            setAutos(autos)
        } catch(error) {
            console.error(error)
        }
    };

    const deleteAuto = async (vin) => {
        const url = `http://localhost:8100/api/automobiles/${vin}/`;
        try {
            const response = await fetch(url, { method: "DELETE" });
            if (response.ok) {
                setAutos(autos.filter((auto) => auto.vin !== vin));
            } else {
                console.error("Failed to delete automobile.");
            }
        } catch (error) {
                console.error(error);
            }
    };



    useEffect(()=>{fetchModels()},[]);

    return (
        <div>
            <h1>Automobiles</h1>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                    <th scope="col">VIN</th>
                    <th scope="col">Color</th>
                    <th scope="col">Year</th>
                    <th scope="col">Model</th>
                    <th scope="col">Manufacturer</th>
                    <th scope="col">Sold</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    {autos.map((auto)=>
                        <tr key={auto.id}>
                            <td scope="col">{auto.vin}</td>
                            <td scope="col" style={{ color: auto.color }} >{auto.color[0].toUpperCase() + auto.color.slice(1)}</td>
                            <td scope="col">{auto.year}</td>
                            <td scope="col">{auto.model.name}</td>
                            <td scope="col">{auto.model.manufacturer.name}</td>
                            <td scope="col">{auto.sold ? "Yes" : "No"}</td>
                            <td>
                            <button className="btn btn-danger btn-sm" onClick={() => deleteAuto(auto.vin)}>
                                Delete
                            </button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default ModelList;
