import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";


import ModelList from "./ModelList";
import Nav from "./Nav";
import ListManufacturers from "./ListManufacturers";
import CreateManufacturer from "./CreateManufacturer";
import CreateInventory from "./CreateInventory";


function App() {
	return (
		<BrowserRouter>
			<Nav />
			<div className="container">
				<Routes>
					<Route path="/" element={<MainPage />} />
					<Route path="/manufacturers" element={<ListManufacturers />} />
					<Route path="/manufacturers/new/" element={<CreateManufacturer />} />
					<Route path="/models" element={<ModelList />} />
					{/* <Route path="/models/new" element={<ModelForm />} />
					<Route path="/automobiles" element={<AutomobilesList />} /> */}
					<Route path="/automobiles/new/" element={<CreateInventory />} />
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
