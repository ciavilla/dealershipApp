import { useState, useEffect } from "react";

function CustomersList() {
    const [ customers, setCustomers ] = useState([])

    const handleFetch = async (event) => {
        try {
            const response = await fetch('http://localhost:8090/api/customers/');
            const { customers } = await response.json();
            setCustomers(customers)
        } catch(error){
            console.error(error)
        }
    }

    useEffect(()=>{handleFetch()}, [])

    return (
        <div>
            <h1>Customers</h1>
            <table className="table table-striped table-hover">
                <thead>
                    <tr>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Phone Number</th>
                    <th scope="col">Address</th>
                    </tr>
                </thead>
                <tbody className="table-group-divider">
                    {customers.map((customer)=>
                        <tr key={customer.id}>
                        <td>{customer.first_name}</td>
                        <td>{customer.last_name}</td>
                        <td>{customer.phone_number.slice(0, 3)}-{customer.phone_number.slice(3, 6)}-{customer.phone_number.slice(6)}</td>
                        <td>{customer.address}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default CustomersList;
