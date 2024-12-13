import { useState, useEffect } from "react"

function SalesList() {
    const [ sales, setSales ] = useState([]);


    const fetchModels = async () => {
        const url = "http://localhost:8090/api/sales/"
        try {
            const request = await fetch(url)
            const { sales } = await request.json()
            setSales(sales)
        } catch(error) {
            console.error(error)
        }

    }
    useEffect(()=>{fetchModels()},[]);

    return (
        <div>
            <h1>Sales</h1>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                    <th scope="col">Salesperson Employee ID</th>
                    <th scope="col">Salesperson Name</th>
                    <th scope="col">Customer</th>
                    <th scope="col">VIN</th>
                    <th scope="col">Price</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    {sales.map((sale)=>
                        <tr key={sale.id}>
                        <td>{sale.salesperson.employee_id}</td>
                        <td>{sale.salesperson.first_name} {sale.salesperson.last_name}</td>
                        <td>{sale.customer.first_name} {sale.customer.last_name}</td>
                        <td>{sale.automobile.vin}</td>
                        <td>${sale.price}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default SalesList;
