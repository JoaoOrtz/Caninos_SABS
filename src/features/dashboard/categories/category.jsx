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

  const [categorieError, setCategorieError] = useState({
    show: false,
    title: "",
    message: "",
    type: "warning",
  });

  // Verificar categoria
  const checkCategorie = (categorie) => {
    if (!categorie || categorie.length === 0) {
      setCategorieError({
        show: true,
        title: "Aviso",
        message: "No se encontró ninguna categoria.",
        type: "warning",
      });
      return true;
    }
    setCategorieError({ ...categorieError, show: false });
    return false;
  };

  useEffect(() => {
    const data = async () => {
      try {
        const response = await getCategories();
        const categorie = response?.data || []
        setDataCategories(response.data.categories);
        checkCategorie(categorie)
      } catch (error) {
        setCategorieError({
          show: true,
          title: "Error",
          message: "Error al cargar las categorías",
          type: "danger"
        });
        console.error("Error fetching roles:", err);
      }
    };
    data();
  }, []);

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

        {/* Mensaje de error para productos */}
        {categorieError.show && (
          <div className={`alert alert-${categorieError.type} alert-dismissible fade show mb-2`} role="alert">
            <strong>{categorieError.title}</strong> {categorieError.message}
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
