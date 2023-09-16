/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getBook } from "../../utils/bookControllers";
import { getEditorials } from "../../utils/editorialControllers";
import { BsArrowLeft } from "react-icons/bs";
import "./Detail.css";

export default function Detail() {
	const { id } = useParams();
	const [book, setBook] = useState(null);
	const [editorials, setEditorials] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [bookEditorial, setBookEditorial] = useState(null);

	useEffect(() => {
		const fetchBookDetails = async () => {
			try {
				setLoading(true);
				setError(null);

				const [bookResponse, editorialsResponse] = await Promise.all([
					getBook(id),
					getEditorials(), // Obtener la lista de editoriales
				]);

				setBook(bookResponse);
				setEditorials(editorialsResponse); // Configurar el estado con las editoriales

				// Buscar la editorial correspondiente al libro
				const foundEditorial = editorialsResponse.find(
					(editorial) => editorial.id === bookResponse.editorialId
				);

				setBookEditorial(foundEditorial); // Configurar el estado con la editorial del libro
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		};

		fetchBookDetails();
	}, [id]);

	if (loading) {
		return <p>Cargando...</p>;
	}

	if (error) {
		return <p>Error al cargar los detalles del libro: {error.message}</p>;
	}

	return (
		<div className="container-fluid">
			<Link to="/" style={{ display: "flex", alignContent: "left", marginTop: "0" }}>
				<button
					type="button"
					className="btn btn-outline-secondary"
					style={{ width: "60px" }}
				>
					<BsArrowLeft />
				</button>
			</Link>
			<div className="sub-container">
				<div className="img-container">
					<img src={book.image} className="img" />
				</div>
				<div className="text-container">
					<h3 className="name">{book.name}</h3>
					<div className="p">
						<p>{book.author}</p>
						<p>{book.genre}</p>
						{bookEditorial && (
							<img
								src={bookEditorial.logo} 
								alt={bookEditorial.name}
								className="editorial-logo"
							/>
						)}
						<p>{book.description}</p>
					</div>
					<div className="price">
						<p>$ {book.price}</p>
					</div>
				</div>
			</div>
		</div>
	);
}
