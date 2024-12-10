import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";


import ModelList from "./ModelList";
import Nav from "./Nav";

function App() {
	return (
		<BrowserRouter>
			<Nav />
			<div className="container">
				<Routes>
					<Route path="/" element={<MainPage />} />


					<Route path="/models" element={<ModelList />} />
					{/* <Route path="/models/new" element={<ModelForm />} />
					<Route path="/automobiles" element={<AutomobilesList />} /> */}

				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
