import React, { useEffect, useState } from "react";
import { FiEye } from "react-icons/fi";
import { getOneUser } from "../../services/users.service";

export const SeeUser = ({ id }) => {
  const [dataUser, setDataUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getOneUser(id);
      setDataUser(response.data);
    };
    fetchData();
  }, [id]);

  // Usa el ID del usuario para crear un ID único para el modal
  const modalId = `userModal-${id}`;

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
                Ver producto
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body" style={{ overflowX: "auto" }}>
              {dataUser ? (
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Nombre</th>
                      <th scope="col">Email</th>
                      <th scope="col">Contraseña</th>
                      <th scope="col">Rol</th>
                      <th scope="col">Compañia</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{dataUser.id}</td>
                      <td>{dataUser.fullName}</td>
                      <td>{dataUser.email}</td>
                      <td>${dataUser.password}</td>
                      <td>{dataUser.role?.name|| "Sin Rol"}</td>
                      <td>{dataUser.company?.name}</td>
                    </tr>
                  </tbody>
                </table>
              ) : (
                <p>Cargando producto...</p>
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
