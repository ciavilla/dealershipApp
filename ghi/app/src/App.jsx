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
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
