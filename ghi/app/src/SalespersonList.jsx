import { useState, useEffect } from "react";

function SalespersonList() {
    const [ salespeople, setSalespeople ] = useState([])

    const handleFetch = async (event) => {
        try {
            const response = await fetch('http://localhost:8090/api/salespeople/');
            const { salespeople } = await response.json();
            setSalespeople(salespeople)
        } catch(error){
            console.error(error)
        }
    }

    useEffect(()=>{handleFetch()}, [])

    return (
        <div>
            <h1>Models</h1>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                    <th scope="col">Employee ID</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    {salespeople.map((salesperson)=>
                        <tr key={salesperson.id}>
                        <td>{salesperson.employee_id}</td>
                        <td>{salesperson.first_name}</td>
                        <td>{salesperson.last_name}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default SalespersonList;
