import { useState } from "react";
import "./Navbar.css";
import { getBooks } from "../../services/bookControllers";

export default function Navbar({ onSearch }) {
	const [searchQuery, setSearchQuery] = useState("");

	const handleSearchChange = (e) => {
		setSearchQuery(e.target.value);
	};

	const handleSearch = async (e) => {
		e.preventDefault();
		try {
			const books = await getBooks(null, searchQuery, searchQuery);
			onSearch(books);
			console.log("Libros filtrados:", books);
		} catch (error) {
			console.error("Error al buscar libros:", error);
		}
	};

	return (
		<div className="container">
			<nav
				className="navbar fixed-top navbar-expand-lg bg-body-tertiary border-bottom border-body"
				data-bs-theme="dark"
			>
				<div className="container-fluid">
					<button
						className="navbar-toggler"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#navbarTogglerDemo03"
						aria-controls="navbarTogglerDemo03"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<a className="navbar-brand" href="/">
						Navbar
					</a>
					<div className="collapse navbar-collapse" id="navbarTogglerDemo03">
						<ul className="navbar-nav me-auto mb-2 mb-lg-0">
							<li className="nav-item">
								<a className="nav-link active" aria-current="page" href="/">
									Home
								</a>
							</li>
							<li className="nav-item">
								<a className="nav-link" href="/admin">
									Admin
								</a>
							</li>
						</ul>
						<form className="d-flex" role="search" onSubmit={handleSearch}>
							<input
								className="form-control me-2"
								type="search"
								placeholder="Search"
								aria-label="Search"
								value={searchQuery}
								onChange={handleSearchChange}
							/>
							<button className="btn btn-outline-secondary" type="submit">
								Search
							</button>
						</form>
					</div>
				</div>
			</nav>
		</div>
	);
}
