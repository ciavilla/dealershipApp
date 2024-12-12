import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import ModelList from "./ModelList";
import ModelForm from "./ModelForm";
import Nav from "./Nav";
import ListManufacturers from "./ListManufacturers";
import CreateManufacturer from "./CreateManufacturer";
import AutomobilesList from "./AutomobilesList";
import CreateInventory from "./CreateInventory";
import SalespersonList from "./SalespersonList";
import SalespersonForm from "./SalespersonForm";
import CustomersList from "./CustomersList";
import CustomersForm from "./CustomersForm";


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
					<Route path="/salespeople" element={<SalespersonList />} />
					<Route path="/salespeople/create/" element={<SalespersonForm />} />
					<Route path="/customers" element={<CustomersList />} />
					<Route path="/customers/create/" element={<CustomersForm />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
