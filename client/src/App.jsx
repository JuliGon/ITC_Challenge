import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home.jsx";
import Detail from "./pages/detail/Detail.jsx";
import Admin from "./pages/admin/Admin.jsx";
import Navbar from "./components/navbar/Navbar.jsx";
import Footer from "./components/footer/Footer.jsx";

function App() {
	const [books, setBooks] = useState([]);

	const handleSearchResults = (searchResults) => {
		setBooks(searchResults);
	};

	return (
		<Router>
			<div>
				<Navbar onSearch={handleSearchResults} />
				<Routes>
					<Route exact path="/books/:id" element={<Detail />} />
					<Route path="/admin" element={<Admin />} />
					<Route exact path="/" element={<Home books={books} />} />
				</Routes>
				<Footer />
			</div>
		</Router>
	);
}

export default App;
