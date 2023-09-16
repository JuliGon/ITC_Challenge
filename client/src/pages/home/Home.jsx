/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { getBooks } from "../../utils/bookControllers";
import Card from "../../components/card/Card";
import { Link } from "react-router-dom";
import "./Home.css";

export default function Home({ books: initialBooks }) {
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [books, setBooks] = useState(initialBooks);

	useEffect(() => {
		const controller = new AbortController();
		const signal = controller.signal;

		const fetchBooks = async () => {
			try {
				setLoading(true);
				setError(null);

				const response = await getBooks(signal);
				setBooks(response);
			} catch (error) {
				if (!signal.aborted) {
					setError(error);
				}
			} finally {
				setLoading(false);
			}
		};

		fetchBooks();

		return () => {
			controller.abort();
		};
	}, []);

	// Actualiza los libros cuando initialBooks cambia
	useEffect(() => {
		setBooks(initialBooks);
	}, [initialBooks]);

	return (
		<div className="container-fluid">
			<div className="row row-cols-2 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
				{books?.map((e, index) => {
					return (
						<Link
							to={`/books/${e.id}`}
							key={index}
							style={{ textDecoration: "none" }}
						>
							<div className="cards">
								<Card
									key={e.id}
									image={e.image}
									name={e.name}
									author={e.author}
									price={e.price}
								/>
							</div>
						</Link>
					);
				})}
			</div>
		</div>
	);
}
