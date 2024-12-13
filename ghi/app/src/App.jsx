import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import ModelList from "./ModelList";
import ModelForm from "./ModelForm";
import Nav from "./Nav";
import ListManufacturers from "./ListManufacturers";
import CreateManufacturer from "./CreateManufacturer";
import AutomobilesList from "./AutomobilesList";
import CreateInventory from "./CreateInventory";
import TechnicianList from "./ListTechnicians";
import AddTechnician from "./AddTechnician";
import CreateServiceAppointment from "./CreateAppointment";
import ServiceAppointments from "./ServiceAppointments";
import ServiceHistory from "./ServiceHistory";
import SalespersonList from "./SalespersonList";
import SalespersonForm from "./SalespersonForm";
import CustomersList from "./CustomersList";
import CustomersForm from "./CustomersForm";
import SalesList from "./SalesList";
import SalesForm from "./SalesForm";
import SalespersonHistoryList from "./SalespersonHistoryList";


function App() {
	return (
		<BrowserRouter>
			<Nav />
			<div className="container">
				<Routes>
					<Route path="/" element={<MainPage />} />
					<Route path="/manufacturers" element={<ListManufacturers />} />
					<Route path="/manufacturers/create/" element={<CreateManufacturer />} />
					<Route path="/models" element={<ModelList />} />
					<Route path="/models/create" element={<ModelForm />} />
					<Route path="/automobiles" element={<AutomobilesList />} />
					<Route path="/automobiles/create/" element={<CreateInventory />} />
					<Route path="/technicians" element={<TechnicianList />} />
					<Route path="/technicians/create/" element={<AddTechnician />} />
					<Route path="/appointments" element={<ServiceAppointments />} />
					<Route path="/appointments/create/" element={<CreateServiceAppointment />} />
					<Route path="/servicehistory/" element={<ServiceHistory />} />
					<Route path="/salespeople" element={<SalespersonList />} />
					<Route path="/salespeople/create/" element={<SalespersonForm />} />
					<Route path="/customers" element={<CustomersList />} />
					<Route path="/customers/create/" element={<CustomersForm />} />
					<Route path="/sales" element={<SalesList />} />
					<Route path="/sales/create" element={<SalesForm />} />
					<Route path="/sales/history" element={<SalespersonHistoryList />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
