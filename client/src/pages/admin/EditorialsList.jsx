import { useState } from "react";
import ReactPaginate from "react-paginate";

export default function EditorialsList({ editorials, handleDeleteEditorial }) {
  const [currentPage, setCurrentPage] = useState(0);
  const editorialsPerPage = 10;
  const pageCount = Math.ceil(editorials.length / editorialsPerPage);

  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const offset = currentPage * editorialsPerPage;
  const currentEditorials = editorials.slice(offset, offset + editorialsPerPage);

  return (
    <div className="container-fluid" style={{padding: "1rem"}}>
      <table className="table table-dark table-hover text-light">
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {currentEditorials?.map((editorial) => (
            <tr key={editorial.id}>
              <td>{editorial.name}</td>
              <td>
                <button
                  onClick={() => handleDeleteEditorial(editorial.id)}
                  className="btn btn-outline-danger"
                >
                  Eliminar
                </button>
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


