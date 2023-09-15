import { useState } from "react";

export default function CreateEditorialForm({ createEditorial }) {
	const [editorialData, setEditorialData] = useState({
		name: "",
		logo: "",
	});

	const handleCreateEditorial = (e) => {
    e.preventDefault();
    try {
		createEditorial(editorialData);
		setEditorialData({
			name: "",
			logo: "",
		});
  } catch (error) {
    console.error("Error al crear la editorial", error);
  }
	};

	return (
		<div className="container-fluid" style={{padding: "1rem"}}>
			<form onSubmit={handleCreateEditorial}>
				<div className="mb-3">
				<label htmlFor="editorialName" className="form-label text-light">
            Nombre de la editorial
          </label>
          <input
            type="text"
            className="form-control bg-dark text-light"
            id="editorialName"
            value={editorialData.name}
            onChange={(e) =>
              setEditorialData({ ...editorialData, name: e.target.value })
            }
          />
        </div>
        <div className="mb-3">
          <label htmlFor="editorialLogo" className="form-label text-light">
            Logo de la editorial
          </label>
          <input
            type="text"
            className="form-control bg-dark text-light"
            id="editorialLogo"
            value={editorialData.logo}
            onChange={(e) =>
              setEditorialData({ ...editorialData, logo: e.target.value })
            }
          />
        </div>

        <button
          type="submit"
          className="btn btn-outline-primary"
        >
          Crear Editorial
        </button>
			</form>
		</div>
	);
}
