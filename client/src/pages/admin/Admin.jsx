/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import "./Admin.css";
import BooksList from "./BooksList";
import EditorialsList from "./EditorialsList";
import CreateBookForm from "./CreateBookForm";
import CreateEditorialForm from "./CreateEditorialForm";
import EditBookForm from "./EditBookForm";
import {
	getBooks,
	createBook,
	updateBook,
	deleteBook,
} from "../../services/bookControllers";
import {
	getEditorials,
	createEditorial,
	deleteEditorial,
} from "../../services/editorialControllers";

export default function Admin() {
	const [activeTab, setActiveTab] = useState("books");

	const [books, setBooks] = useState([]);
	const [editorials, setEditorials] = useState([]);
	const [bookId, setBookId] = useState(null);
	const [editorialId, setEditorialId] = useState(null);

	// Estados para el modo de edición y el ID del libro seleccionado para edición
  const [isEditing, setIsEditing] = useState(false);
  const [editBookId, setEditBookId] = useState(null);

  // Función para iniciar la edición de un libro
  const handleEditBook = (id) => {
		try {
			setIsEditing(true);
    setEditBookId(id);
		} catch (error) {
			console.error("Error al editar el libro", error);
		}    
  };

  // Función para actualizar un libro
  const handleUpdateBook = async (id, updatedData) => {
    try {
      const updatedBook = await updateBook(id, updatedData);
      const updatedBooks = books.map((book) =>
        book.id === id ? updatedBook : book
      );
      setBooks(updatedBooks);
      setIsEditing(false); // Terminar el modo de edición después de la actualización
      setEditBookId(null);
    } catch (error) {
      console.error("Error al editar el libro", error);
    }
  };

	useEffect(() => {
		async function fetchData() {
			try {
				const booksResponse = await getBooks();
				const editorialsResponse = await getEditorials();

				setBooks(booksResponse);
				setEditorials(editorialsResponse);
			} catch (error) {
				console.error("Error al cargar datos", error);
			}
		}

		fetchData();
	}, []);

	const handleCreateBook = async (bookData) => {
		try {
			const newBook = await createBook(bookData);
			setBooks([...books, newBook]);
		} catch (error) {
			console.error("Error al crear el libro", error);
		}
	};

	const handleDeleteBook = async (id) => {
		try {
			await deleteBook(id);
			const updatedBooks = books.filter((book) => book.id !== id);
			setBooks(updatedBooks);
		} catch (error) {
			console.error("Error al eliminar el libro", error);
		}
	};

	const handleCreateEditorial = async (editorialData) => {
		try {
			const newEditorial = await createEditorial(editorialData);
			setEditorials([...editorials, newEditorial]);
		} catch (error) {
			console.error("Error al crear la editorial", error);
		}
	};

	const handleDeleteEditorial = async (id) => {
		try {
			await deleteEditorial(id);
			const updatedEditorials = editorials.filter(
				(editorial) => editorial.id !== id
			);
			setEditorials(updatedEditorials);
		} catch (error) {
			console.error("Error al eliminar la editorial", error);
		}
	};

	return (
		<div className="container-fluid bg-dark text-light">
		<ul className="nav bg-dark nav-tabs" id="myTab" role="tablist">
			<li className="nav-item" role="presentation">
				<button
					className={`nav-link ${
						activeTab === "books" ? "active text-dark" : "text-light"
					}`}
					id="books-tab"
					data-bs-toggle="tab"
					data-bs-target="#books"
					type="button"
					role="tab"
					aria-controls="books"
					aria-selected={activeTab === "books"}
					onClick={() => setActiveTab("books")}
				>
					Libros
				</button>
			</li>
			<li className="nav-item" role="presentation">
				<button
					className={`nav-link ${
						activeTab === "editorials" ? "active text-dark" : "text-light"
					}`}
					id="editorials-tab"
					data-bs-toggle="tab"
					data-bs-target="#editorials"
					type="button"
					role="tab"
					aria-controls="editorials"
					aria-selected={activeTab === "editorials"}
					onClick={() => setActiveTab("editorials")}
				>
					Editoriales
				</button>
			</li>
		</ul>

		<div className="tab-content" id="myTabContent">
			<div
				className={`tab-pane fade ${
					activeTab === "books" ? "show active" : ""
				} bg-dark text-light`}
				id="books"
				role="tabpanel"
				aria-labelledby="books-tab"
			>
				<button
					type="button"
					className="btn btn-outline-secondary"
					style={{marginTop: "10px"}}
					onClick={() => setActiveTab("createBook")}
				>
					Crear Libro
				</button>
				{isEditing ? (
					<EditBookForm
						book={books.find((book) => book.id === editBookId)}
						updateBook={handleUpdateBook}
						onCancel={() => {
							setIsEditing(false);
							setEditBookId(null);
						}}
					/>
				) : (
					<div>
						<BooksList
							books={books}
							handleDeleteBook={handleDeleteBook}
							handleEditBook={handleEditBook}
						/>
					</div>
				)}
			</div>
			<div
				className={`tab-pane fade ${
					activeTab === "editorials" ? "show active" : ""
				} bg-dark text-light`}
				id="editorials"
				role="tabpanel"
				aria-labelledby="editorials-tab"
			>
				<button
					type="button"
					className="btn btn-outline-secondary"
					style={{marginTop: "10px"}}
					onClick={() => setActiveTab("createEditorial")}
				>
					Crear Editorial
				</button>
				<EditorialsList
					editorials={editorials}
					handleDeleteEditorial={handleDeleteEditorial}
				/>
			</div>
			<div
				className={`tab-pane fade ${
					activeTab === "createBook" ? "show active" : ""
				} bg-dark text-light`}
				id="createBook"
				role="tabpanel"
				aria-labelledby="createBook-tab"
			>
				<CreateBookForm createBook={handleCreateBook} editorials={editorials} />
			</div>
			<div
				className={`tab-pane fade ${
					activeTab === "createEditorial" ? "show active" : ""
				} bg-dark text-light`}
				id="createEditorial"
				role="tabpanel"
				aria-labelledby="createEditorial-tab"
			>
				<CreateEditorialForm createEditorial={handleCreateEditorial} />
			</div>
		</div>
	</div>
	);
}
