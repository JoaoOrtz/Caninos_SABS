import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRols } from "./service/roles.service";
import { AlertDeleteRol } from "./components/delete/detele";
import { SeeRol } from "./components/see/seeRol";
// icons
import { MdDelete } from "react-icons/md";
import { RiEditBoxLine } from "react-icons/ri";

export const RoleDashboard = () => {
  const navigate = useNavigate();

  const [dataRols, setDataRols] = useState([]);
  const [rolError, setRolError] = useState({
    show: false,
    title: "",
    message: "",
    type: "warning",
  });

  // Verificar rol
  const checkRol = (rol) => {
    if (!rol || rol.length === 0) {
      setRolError({
        show: true,
        title: "Aviso",
        message: "No se encontró ningun rol.",
        type: "warning",
      });
      return true;
    }
    setRolError({ ...rolError, show: false });
    return false;
  };

  useEffect(() => {
    const data = async () => {
      try {
        const response = await getRols();
        const rol = response?.data || [];
        setDataRols(response.data);
        checkRol(rol);
      } catch (error) {
        setRolError({
          show: true,
          title: "Error",
          message: "Error al cargar los roles",
          type: "danger",
        });
        console.error("Error fetching roles:", err);
      }
    };
    data();
  }, []);

  const viewForm = () => {
    navigate("/dashboard/nuevo-Rol");
  };

  const viewUpdate = (id) => {
    navigate("/dashboard/editar-Rol/" + id);
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row g-3 p-2 align-items-center">
          <div className="col">
            <h2>Lista De Rol</h2>
          </div>
          <div className="col-auto ms-auto">
            <button
              type="button"
              className="btn btn-primary"
              onClick={viewForm}
            >
              Nuevo Rol
            </button>
          </div>
        </div>
        {/* Mensaje de error para productos */}
        {rolError.show && (
          <div
            className={`alert alert-${rolError.type} alert-dismissible fade show mb-2`}
            role="alert"
          >
            <strong>{rolError.title}</strong> {rolError.message}
          </div>
        )}
        <div className="table-responsive">
          <table
            className="table table-hover align-middle shadow-sm"
            style={{
              backgroundColor: "#fff",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <thead style={{ backgroundColor: "#f0f0f0" }}>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {dataRols.map((e, i) => (
                <tr key={i}>
                  <td>{e.id}</td>
                  <td>{e.name}</td>
                  <td
                    style={{
                      maxWidth: "250px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {e.description}
                  </td>

                  <td>
                    <div className="btn-group" role="group">
                      {e.id === 1 ? (
                        <SeeRol id={e.id} />
                      ) : (
                        <>
                          <button
                            type="button"
                            className="btn btn-outline-danger btn-sm"
                            onClick={() =>
                              AlertDeleteRol(
                                e.id,
                                "¿De seguro quieres eliminar el rol?",
                                `El rol que quieres eliminar es ${e.name}`,
                                () => {
                                  getRols().then((response) => {
                                    const updateRols = response.data || [];
                                    setDataRols(updateRols);
                                  });
                                }
                              )
                            }
                          >
                            <MdDelete />
                          </button>
                          <SeeRol id={e.id} />
                          <button
                            type="button"
                            className="btn btn-outline-success btn-sm"
                            onClick={() => viewUpdate(e.id)}
                          >
                            <RiEditBoxLine />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
