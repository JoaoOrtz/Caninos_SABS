import React, { useEffect, useState } from "react";
import { FiEye } from "react-icons/fi";
import { getCategorie } from "../../service/serviceCategorie";

export const SeeCategorie = ({ id }) => {
  const [dataCategorie, setDataCategorie] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getCategorie(id);
      setDataCategorie(response.data.category);
    };
    fetchData();
  }, [id]);

  // Usa el ID del producto para crear un ID único para el modal
  const modalId = `productModal-${id}`;

  return (
    <>
      <button
        type="button"
        className="btn btn-outline-warning"
        data-bs-toggle="modal"
        data-bs-target={`#${modalId}`}
      >
        <FiEye />
      </button>

      <div
        className="modal fade"
        id={modalId}
        tabIndex="-1"
        aria-labelledby={`exampleModalLabel-${id}`}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id={`exampleModalLabel-${id}`}>
                Ver Categoría
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body" style={{ overflowX: "auto" }}>
              {dataCategorie ? (
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Nombre</th>
                      <th>Descripción</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{dataCategorie.id}</td>
                      <td>{dataCategorie.name}</td>
                      <td>{dataCategorie.description}</td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <p>Cargando categoría...</p>
              )}
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
