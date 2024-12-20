import { useState, useEffect } from "react";

function SalespersonList() {
    const [ salespeople, setSalespeople ] = useState([])

    const handleFetch = async () => {
        try {
            const response = await fetch('http://localhost:8090/api/salespeople/');
            const { salespeople } = await response.json();
            setSalespeople(salespeople)
        } catch(error){
            console.error(error)
        }
    }

    const deleteSalesperson = async (id) => {
        const url = `http://localhost:8090/api/salespeople/${id}/`;
        try {
            const response = await fetch(url, { method: "DELETE" });
            if (!response.ok) {
                throw new Error("Failed to delete salesperson");
            }
            // Update state to remove the deleted salesperson
            setSalespeople((prevSalespeople) =>
                prevSalespeople.filter((salesperson) => salesperson.id !== id)
            );
        } catch (error) {
            console.error("Error deleting salesperson:", error);
        }
    };


    useEffect(()=>{handleFetch()}, [])

    return (
        <div>
            <h1>Salespeople</h1>
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
                        <button
                                    className="btn btn-danger btn-sm"
                                    onClick={() => deleteSalesperson(salesperson.id)}
                                >
                                    Delete
                                </button>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default SalespersonList;
