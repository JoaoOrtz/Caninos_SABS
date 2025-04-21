import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AlertSuccess } from "../../../../../shared/alert/success";
import { checkCategorieName, getCategorie, putCategorie } from "../../service/serviceCategorie";

export const UpdateCategorie = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Objeto de datos

  const [formCategorie, setFormCategorie] = useState({
    name: "",
    description: "",
  });

  const [originalValues, setOriginalValues] = useState({ 
    name: ""
  })

  // se define las variables que contendrán las alertas

  const [alertError, setAlertError] = useState({
    show: false,
    title: "",
    message: "",
    type: "warning",
  });

  useEffect(() => {
    const data = async () => {
      if (id) {
        const response = await getCategorie(id);
        if (response.data.category) {
          setFormCategorie({
            name: response.data.category.name,
            description: response.data.category.description,
          });

          setOriginalValues({
            name: response.data.category.name
          })
        }
      }
    };
    data();
  }, [id]);

  // Recolección de datos

  const changeData = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormCategorie({
      ...formCategorie,
      [name]: value,
    });
  };

  const validatorName = async () => {
    const name = formCategorie.name.trim()
    const originalName = originalValues.name.trim()

    if (name.toLowerCase() === originalName.toLowerCase()) {
      return true;  // no ha cambiado, no valida
    }

    const nameExists = await checkCategorieName(name)
    if (nameExists) {
      setAlertError({
        show: true,
        title: "Error",
        message: "Ya existe un rol con este nombre",
        type: "danger",
      })
      return false
    }

    setAlertError((prev) => ({ ...prev, show: false }));
    return true
  }

  const HandleSubmit = async (e) => {
    e.preventDefault();

    if (!validatorName()) {
      return;
    }

    if (!validateForm()) {
      return;
    }

    const response = await putCategorie(id, formCategorie);
    if (response.status === 200) {
      navigate("/dashboard/categorias");
      AlertSuccess("Rol actualizado", "El rol se ha actualizado");
    }
  };

  // Validación datos vacíos

  const validateForm = () => {
    // Verificar campos obligatorios
    if (!formCategorie.name.trim()) {
      setAlertError({
        show: true,
        title: "Error",
        message: "El nombre de la categoría es obligatorio",
        type: "danger",
      });
      return false;
    }

    if (!formCategorie.description.trim()) {
      setAlertError({
        show: true,
        title: "Error",
        message: "La descripción de la categoria es obligatorio",
        type: "danger",
      });
      return false;
    }

    return true;
  };

  const back = () => {
    navigate("/dashboard/categorias");
  };

  return (
    <>
      <button
        type="button"
        onClick={back}
        className="btn btn-primary rounded-circle d-flex align-items-center p-2 justify-content-center"
        style={{ width: "40px", height: "40px" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          style={{ width: "20px", height: "20px" }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>

      <div className="container">
        <h2 className="mb-4 mt-3">Formulario de actualización de categoría</h2>

        {/* alerta */}
        {alertError.show && (
          <div
            className={`alert alert-${alertError.type} alert-dismissible fade show mb-2`}
            role="alert"
          >
            <strong>{alertError.title}</strong> {alertError.message}
          </div>
        )}

        <form onSubmit={HandleSubmit}>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">
              Nombre
            </label>
            <input
              name="name"
              onBlur={validatorName}
              value={formCategorie.name}
              onChange={changeData}
              type="text"
              className="form-control"
              placeholder="Ingrese el nombre de la categoría"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="descripcion" className="form-label">
              Descripción
            </label>
            <textarea
              name="description"
              value={formCategorie.description}
              onChange={changeData}
              className="form-control"
              id="descripcion"
              rows="3"
              placeholder="Ingrese una descripción"
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary">
            Guardar
          </button>
        </form>
      </div>
    </>
  );
};
