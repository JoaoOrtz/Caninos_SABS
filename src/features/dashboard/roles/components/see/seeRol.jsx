import React, { useEffect, useState } from "react";
import { FiEye } from "react-icons/fi";
import { getRol } from "../../service/roles.service";

export const SeeRol = ({ id }) => {
  const [dataRol, setDataRol] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getRol(id);
      setDataRol(response.data);
      console.log(response);
    };
    fetchData();
  }, [id]);

  const modalId = `rolModal${id}`;

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
        aria-labelledby={`exampleModalLabel${id}`}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id={`exampleModalLabel${id}`}>
                Ver Rol
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body" style={{ overflowX: "auto" }}>
              {dataRol ? (
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
                      <td>{dataRol.id}</td>
                      <td>{dataRol.name}</td>
                      <td>{dataRol.description}</td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <p>Cargando rol...</p>
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
