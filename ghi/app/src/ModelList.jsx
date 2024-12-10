import { useState, useEffect } from "react"

function ModelList() {
    const [ models, setModels ] = useState([]);


    const fetchModels = async () => {
        const url = "http://localhost:8100/api/models/"
        try {
            const request = await fetch(url)
            const { models } = await request.json()
            console.log(models)
            setModels(models)
        } catch(error) {
            console.error(error)
        }

    }
    useEffect(()=>{fetchModels()},[]);

    return (
        <div>
            <h1>Models</h1>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Manufacturer</th>
                    <th scope="col">Picture</th>
                    </tr>
                </thead>
                <tbody class="table-group-divider">
                    {models.map((model)=>
                        <tr key={model.id}>
                        <td>{model.name}</td>
                        <td>{model.manufacturer.name}</td>
                        <td><img src={model.picture_url}/></td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default ModelList;
