import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { checkRolName, getRol, putRol } from "../../service/roles.service";
import { AlertSuccess } from "../../../../../shared/alert/success";

export const FormRolUpdate = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Objeto de datos

  const [formRol, setFormRol] = useState({
    name: "",
    description: ""
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
        const response = await getRol(id);
        if (response.data) {
          setFormRol({
            name: response.data.name,
            description: response.data.description,
          });
          setOriginalValues({
            name: response.data.name
          })
        }
      }
    };
    data();
  }, [id]);

  // recolleción de datos
  const changeData = (e) => {
    const { name, value } = e.target;
    setFormRol({
      ...formRol,
      [name]: value,
    });
  };

  const validatorName = async () => {
    const name = formRol.name.trim();
    const originalName = originalValues.name.trim()

    if (name.toLowerCase() === originalName.toLowerCase()) {
      return true
    }

    const nameExists = await checkRolName(name);
    if (nameExists) {
      setAlertError({
        show: true,
        title: "Error",
        message: "Ya existe un rol con este nombre",
        type: "danger",
      });
      return false;
    }

    setAlertError((prev) => ({ ...prev, show: false }));
    return true;
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();

    if (!validatorName()) {
      return;
    }

    if (!validateForm()) {
      return;
    }

    const response = await putRol(id, formRol);
    if (response.status === 200) {
      navigate("/dashboard/Roles");
      AlertSuccess("Rol actualizado", "El rol se ha actualizado");
    }
  };

  // Validación datos vacíos

  const validateForm = () => {
    // Verificar campos obligatorios
    if (!formRol.name.trim()) {
      setAlertError({
        show: true,
        title: "Error",
        message: "El nombre del rol es obligatorio",
        type: "danger",
      });
      return false;
    }

    if (!formRol.description.trim()) {
      setAlertError({
        show: true,
        title: "Error",
        message: "La descripción del rol es obligatorio",
        type: "danger",
      });
      return false;
    }

    return true;
  };

  const back = () => {
    navigate("/dashboard/Roles");
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
        <h2 className="mb-4 mt-3">Formulario de actualización de rol</h2>

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
              value={formRol.name}
              onChange={changeData}
              type="text"
              className="form-control"
              placeholder="Ingrese el nombre del producto"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="descripcion" className="form-label">
              Descripción
            </label>
            <textarea
              name="description"
              value={formRol.description}
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
