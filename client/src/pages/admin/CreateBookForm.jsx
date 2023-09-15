import { useState } from "react";

export default function CreateBookForm({ createBook, editorials }) {
	const [bookData, setBookData] = useState({
		name: "",
		author: "",
		description: "",
		editorialId: "",
		genre: "",
		image: "",
		price: "",
	});

	const handleCreateBook = (e) => {
    e.preventDefault();
    try {
		createBook(bookData);
		setBookData({
			name: "",
			author: "",
			description: "",
			editorialId: "",
			genre: "",
			image: "",
			price: "",
		});
  } catch (error) {
    console.error("Error al crear el libro", error);
  }
	};

	return (
		<div className="container-fluid" style={{ padding: "1rem" }}>
      <form onSubmit={handleCreateBook}>
        <div className="mb-3">
          <label htmlFor="bookName" className="form-label text-light">
            Nombre
          </label>
          <input
            type="text"
            className="form-control bg-dark text-light"
            id="bookName"
            value={bookData.name}
            onChange={(e) =>
              setBookData({ ...bookData, name: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="bookAuthor" className="form-label text-light">
            Autor
          </label>
          <input
            type="text"
            className="form-control bg-dark text-light"
            id="bookAuthor"
            value={bookData.author}
            onChange={(e) =>
              setBookData({ ...bookData, author: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="bookDescription" className="form-label text-light">
            Descripción del libro
          </label>
          <textarea
            className="form-control bg-dark text-light"
            id="bookDescription"
            rows="3"
            value={bookData.description}
            onChange={(e) =>
              setBookData({ ...bookData, description: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="bookCover" className="form-label text-light">
            Portada
          </label>
          <input
            type="text"
            className="form-control bg-dark text-light"
            id="bookCover"
            value={bookData.image}
            onChange={(e) =>
              setBookData({ ...bookData, image: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="bookEditorial" className="form-label text-light">
            Editorial
          </label>
          <select
            className="form-select bg-dark text-light"
            id="bookEditorial"
            value={bookData.editorialId}
            onChange={(e) =>
              setBookData({ ...bookData, editorialId: e.target.value })
            }
          >
            <option value="">Seleccionar una editorial</option>
            {editorials?.map((editorial) => (
              <option key={editorial.id} value={editorial.id}>
                {editorial.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="bookGenre" className="form-label text-light">
            Género
          </label>
          <input
            type="text"
            className="form-control bg-dark text-light"
            id="bookGenre"
            value={bookData.genre}
            onChange={(e) =>
              setBookData({ ...bookData, genre: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="bookPrice" className="form-label text-light">
            Precio
          </label>
          <input
            type="number"
            className="form-control bg-dark text-light"
            id="bookPrice"
            value={bookData.price}
            onChange={(e) =>
              setBookData({ ...bookData, price: e.target.value })
            }
          />
        </div>
        <button
          type="submit"
          className="btn btn-outline-primary"
        >
          Crear Libro
        </button>
      </form>
    </div>
	);
}
