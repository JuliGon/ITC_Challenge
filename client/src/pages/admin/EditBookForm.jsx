import { useState } from "react";

export default function EditBookForm({ book, updateBook, onCancel }) {
  const [formData, setFormData] = useState({
    name: book.name,
    author: book.author,
    description: book.description,
    editorialId: book.editorialId,
    genre: book.genre,
    image: book.image,
    price: book.price,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateBook(book.id, formData);
  };

  return (
    <div className="container-fluid" style={{ padding: "1rem" }}>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label text-light">
            Nombre
          </label>
          <input
            type="text"
            className="form-control bg-dark text-light"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="author" className="form-label text-light">
            Autor
          </label>
          <input
            type="text"
            className="form-control bg-dark text-light"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label text-light">
            Descripción
          </label>
          <textarea
            type="text"
            className="form-control bg-dark text-light"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="image" className="form-label text-light">
            Portada
          </label>
          <input
            type="text"
            className="form-control bg-dark text-light"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="editorialId" className="form-label text-light">
            Editorial
          </label>
          <input
            type="text"
            className="form-control bg-dark text-light"
            id="editorialId"
            name="editorialId"
            value={formData.editorialId}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="genre" className="form-label text-light">
            Género
          </label>
          <input
            type="text"
            className="form-control bg-dark text-light"
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleInputChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="price" className="form-label text-light">
            Precio
          </label>
          <input
            type="text"
            className="form-control bg-dark text-light"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-outline-primary" style={{marginRight: "5px"}}> 
          Guardar Cambios
        </button>
        <button
          type="button"
          className="btn btn-outline-secondary ml-2"
          onClick={onCancel}
        >
          Cancelar
        </button>
      </form>
    </div>
  );
}

