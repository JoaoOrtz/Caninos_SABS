import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories } from "./service/serviceCategorie";
import { SeeCategorie } from "./components/see/seeCategorie";
import { AlertDeleteCategorie } from "./components/delete/deleteCategorie";
// icons
import { MdDelete } from "react-icons/md";
import { RiEditBoxLine } from "react-icons/ri";

export const CategoryDashboard = () => {
  const navigate = useNavigate();

  const [dataCategories, setDataCategories] = useState([]);

  useEffect(() => {
    const data = async () => {
      const response = await getCategories();
      setDataCategories(response.data.categories);
      console.log(response);
    };
    data();
  }, [dataCategories]);

  const viewForm = () => {
    navigate("/dashboard/nueva-categoria");
  };

  const viewUpdate = (id) => {
    navigate(`/dashboard/editar-categoria/${id}`);
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row g-3 p-2 align-items-center">
          <div className="col">
            <h2>Lista De Categoria</h2>
          </div>
          <div className="col-auto ms-auto">
            <button
              type="button"
              className="btn btn-primary"
              onClick={viewForm}
            >
              Nueva Categoría
            </button>
          </div>
        </div>

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
              {dataCategories.map((e, i) => (
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
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm"
                        onClick={() =>
                          AlertDeleteCategorie(
                            e.id,
                            "¿De seguro quieres eliminar esta categoría?",
                            `La categoría que quieres eliminar es ${e.name}`
                          )
                        }
                      >
                        <MdDelete />
                      </button>
                      <SeeCategorie id={e.id} />
                      <button
                        type="button"
                        className="btn btn-outline-success btn-sm"
                        onClick={() => viewUpdate(e.id)}
                      >
                        <RiEditBoxLine />
                      </button>
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
