import { useState } from "react";
import ReactPaginate from "react-paginate";

export default function BooksList({ books, handleDeleteBook, handleEditBook }) {
  const [currentPage, setCurrentPage] = useState(0);
  const booksPerPage = 10;
  const pageCount = Math.ceil(books.length / booksPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * booksPerPage;
  const currentBooks = books.slice(offset, offset + booksPerPage);

  return (
    <div className="container-fluid" style={{padding: "1rem"}}>
      <table className="table table-dark table-hover text-light">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Autor</th>
            <th>Género</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentBooks?.map((book) => (
            <tr key={book.id}>
              <td>{book.name}</td>
              <td>{book.author}</td>
              <td>{book.genre}</td>
              <td>
              <div className="d-grid gap-2 d-md-block">
                <button
                  onClick={() => handleDeleteBook(book.id)}
                  className="btn btn-outline-danger"
                >
                  Eliminar
                </button>{" "}
                <button
                  onClick={() => handleEditBook(book.id)}
                  className="btn btn-outline-primary"
                >
                  Editar
                </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ReactPaginate
        previousLabel={"Anterior"}
        nextLabel={"Siguiente"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageChange}
        containerClassName={"pagination justify-content-center"}
        activeClassName={"active"}
        previousClassName={"page-item"}
        nextClassName={"page-item"}
        pageClassName={"page-item"}
        pageLinkClassName={"page-link bg-dark text-light"}
        previousLinkClassName={"page-link bg-dark text-light"}
        nextLinkClassName={"page-link bg-dark text-light"}
      />
    </div>
  );
}




