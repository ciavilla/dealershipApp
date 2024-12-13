import { useState, useEffect } from "react";

function SalespersonHistoryList() {
    const [ salespeople, setSalespeople ] = useState([])
    const [ salesperson, setSalesperson ] = useState("")
    const [ sales, setSales ] = useState([])

    const fetchSalespeople = async () => {
        const url = "http://localhost:8090/api/salespeople/"
        try{
            const response = await fetch(url);
            const { salespeople } = await response.json();
            setSalespeople(salespeople)
        } catch(error){
            console.error(error)
        }
    }

    useEffect(()=>{fetchSalespeople()}, [])

    const fetchSales = async () => {
        const url = "http://localhost:8090/api/sales/"
        try{
            const response = await fetch(url);
            const { sales } = await response.json();
            const personSales = []
            for (const sale of sales) {
                if ( sale.salesperson.id == salesperson) {
                    personSales.push(sale)
                }
            }
            setSales(personSales)
        } catch(error){
            console.error(error)
        }
    }

    const handleSalesPersonChange = (event) => {
        setSalesperson(event.target.value)
    }

    useEffect(()=>{fetchSales()}, [salesperson])

    return (
        <div>
            <h1>Salesperson History</h1>
            <div className="mb-3">
                    <select
                        onChange={handleSalesPersonChange}
                        required
                        name="salesperson"
                        id="salesperson"
                        className="form-select"
                        value={salesperson}
                    >
                        <option >Choose a Salesperson...</option>
                        {salespeople.map((salesperson)=>
                            <option key={salesperson.id} value={salesperson.id}>{salesperson.first_name} {salesperson.last_name}</option>)}
                    </select>
            </div>
            <div>
                <table className="table table-striped table-hover">
                    <thead>
                        <tr>
                        <th scope="col">Salesperson</th>
                        <th scope="col">Customer</th>
                        <th scope="col">VIN</th>
                        <th scope="col">Price</th>
                        </tr>
                    </thead>
                    <tbody className="table-group-divider">
                        {sales.map((sale)=>
                            <tr key={sale.id}>
                            <td>{sale.salesperson.first_name} {sale.salesperson.last_name}</td>
                            <td>{sale.customer.first_name} {sale.customer.last_name}</td>
                            <td>{sale.automobile.vin}</td>
                            <td>${sale.price}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default SalespersonHistoryList;
