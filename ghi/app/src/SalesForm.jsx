import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function SalesForm() {
    const [ automobiles, setAutomobiles ] = useState([])
    const [ autombileVIN, setAutombileVIN ] = useState("")
    const [ salesPeople, setSalesPeople ] = useState([])
    const [ salesPerson, setSalesPerson ] = useState("")
    const [ customers, setCustomers ] = useState([])
    const [ customer, setCustomer ] = useState("")
    const [ price, setPrice ] = useState("")
    const navigate = useNavigate()


    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {
            "automobile" : autombileVIN,
            "salesperson" : salesPerson,
            "customer" : customer,
            "price" : price
        }
        const url = "http://localhost:8090/api/sales/"
        try {
            const response = await fetch(url, {
                method : "POST",
                body : JSON.stringify(data),
                headers : {"Content-Type": "application/json"}
            })
            if (response.ok) {
                resetForm()
                navigate("/sales")
            } else{
                console.log("Form had issue with submission")
            }
        }catch(error){
            console.error(error)
        }

    }

    const fetchAutomobileVIN = async () => {
        const url = "http://localhost:8100/api/automobiles/"
        try {
            const response = await fetch(url)
            const { autos } = await response.json()
            const notSold = []
            for (const automobile of autos) {
                if ( automobile.sold == false )
                    notSold.push(automobile)
            }
            setAutomobiles(notSold)
        } catch(error) {
            console.error(error)
        }
    }

    const fetchSalesPeople = async () => {
        const url = "http://localhost:8090/api/salespeople/"
        try {
            const response = await fetch(url)
            const { salespeople } = await response.json()
            setSalesPeople(salespeople)
        } catch(error) {
            console.error(error)
        }
    }

    const fetchCustomers = async () => {
        const url = "http://localhost:8090/api/customers/"
        try {
            const response = await fetch(url)
            const { customers } = await response.json()
            setCustomers(customers)
        } catch(error) {
            console.error(error)
        }
    }

    useEffect(()=>{
        fetchAutomobileVIN(),
        fetchSalesPeople(),
        fetchCustomers()
    }, [])


    const handleAutomobilesVIN = (event) => {
        setAutombileVIN(event.target.value)
    }

    const handleSalesPerson = (event) => {
        setSalesPerson(event.target.value)
    }

    const handleCustomer = (event) => {
        setCustomer(event.target.value)
    }

    const handlePrice = (event) => {
        setPrice(event.target.value)
    }

    const resetForm = () => {
        setAutombileVIN("")
        setSalesPerson("")
        setCustomer("")
        setPrice("")
    }

    return (
        <div className="shadow p-4 mt-4 ">
            <form onSubmit={handleSubmit}>
                <h1>Record a new sale</h1>
                <div className="mb-3">
                    <label htmlFor="automibileVIN" className="form-label">Automobile VIN</label>
                    <select
                        onChange={handleAutomobilesVIN}
                        required
                        name="automobileVIN"
                        id="automobileVIN"
                        className="form-select"
                        value={autombileVIN}
                    >
                        <option >Choose an automobile VIN...</option>
                        {automobiles.map((automobile)=>
                            <option key={automobile.id} value={automobile.vin}>{automobile.vin}</option>)}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="salesperson" className="form-label">Salesperson</label>
                    <select
                        onChange={handleSalesPerson}
                        required
                        name="salesperson"
                        id="salesperson"
                        className="form-select"
                        value={salesPerson}
                    >
                        <option >Choose a salesperson...</option>
                        {salesPeople.map((person)=>
                            <option key={person.id} value={person.id}>{person.first_name} {person.last_name}</option>)}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="customer" className="form-label">Customer</label>
                    <select
                        onChange={handleCustomer}
                        required
                        name="customer"
                        id="customer"
                        className="form-select"
                        value={customer}
                    >
                        <option >Choose a customer...</option>
                        {customers.map((customer)=>
                            <option key={customer.id} value={customer.id}>{customer.first_name} {customer.last_name}</option>)}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price (#.##)</label>
                    <input
                        onChange={handlePrice}
                        required
                        placeholder="0.00"
                        pattern="^\d+(\.\d{1,2})?$"
                        type="text"
                        className="form-control"
                        id="price"
                        value={price}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Create</button>
            </form>
        </div>
    )
}

export default SalesForm;
