import { useState, useEffect } from "react";

function CustomersList() {
    const [ customers, setCustomers ] = useState([]);
    const [editingCustomer, setEditingCustomer] = useState(null);
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        phone_number: "",
        address: "",
    });

    const handleFetch = async () => {
        try {
            const response = await fetch('http://localhost:8090/api/customers/');
            const { customers } = await response.json();
            setCustomers(customers)
        } catch(error){
            console.error(error)
        }
    };

    const handleEdit = (customer) => {
        setEditingCustomer(customer.id);
        setFormData({
            first_name: customer.first_name,
            last_name: customer.last_name,
            phone_number: customer.phone_number,
            address: customer.address,
        });
    };

    const handleCancel = () => {
        setEditingCustomer(null);
        setFormData({
            first_name: "",
            last_name: "",
            phone_number: "",
            address: "",
        });
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleUpdate = async (id) => {
        const url = `http://localhost:8090/api/customers/${id}/`;
        try {
            const response = await fetch(url, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to update customer");
            }

            const updatedCustomer = await response.json();
            setCustomers((prevCustomers) =>
                prevCustomers.map((customer) =>
                    customer.id === id ? updatedCustomer.customer : customer
                )
            );

            handleCancel();
        } catch (error) {
            console.error("Error updating customer:", error);
        }
    };


    useEffect(() => {
        handleFetch();
    }, []);

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
                    {customers.map((customer) => (
                        <tr key={customer.id}>
                            <td>
                                {editingCustomer === customer.id ? (
                                    <input
                                        name="first_name"
                                        value={formData.first_name}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    customer.first_name
                                )}
                            </td>
                            <td>
                                {editingCustomer === customer.id ? (
                                    <input
                                        name="last_name"
                                        value={formData.last_name}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    customer.last_name
                                )}
                            </td>
                            <td>
                                {editingCustomer === customer.id ? (
                                    <input
                                        name="phone_number"
                                        value={formData.phone_number}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    customer.phone_number
                                )}
                            </td>
                            <td>
                                {editingCustomer === customer.id ? (
                                    <input
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                    />
                                ) : (
                                    customer.address
                                )}
                            </td>
                            <td>
                                {editingCustomer === customer.id ? (
                                    <>
                                        <button
                                            className="btn btn-success btn-sm"
                                            onClick={() => handleUpdate(customer.id)}
                                        >
                                            Save
                                        </button>
                                        <button
                                            className="btn btn-secondary btn-sm"
                                            onClick={handleCancel}
                                        >
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        className="btn btn-primary btn-sm"
                                        onClick={() => handleEdit(customer)}
                                    >
                                        Edit
                                    </button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default CustomersList;
