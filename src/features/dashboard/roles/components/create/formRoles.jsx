import React, { useState } from "react";
import { getRols, postRol } from "../../service/roles.service";
import { useNavigate } from "react-router-dom";
import { AlertSuccess } from "../../../../../shared/alert/success";

export const FormRols = () => {
  const navigate = useNavigate();

  const [formRol, setFormRol] = useState({
    name: "",
    description: "",
  });

  // se define las variables que contendrán las alertas

  const [alertError, setAlertError] = useState({
    show: false,
    title: "",
    message: "",
    type: "warning",
  });

  const [alertError1, setAlertError1] = useState({
    show: false,
    title: "",
    message: "",
    type: "warning",
  });

  //Funcion para recolección los datos

  const ChangeData = (e) => {
    const { name, value } = e.target;
    setFormRol({
      ...formRol,
      [name]: value,
    });
  };

  const HandleSubmint = async (e) => {
    e.preventDefault();

    if (!validatorName()) {
      return;
    }

    if (!validateForm()) {
      return;
    }

    const response = await postRol(formRol);
    if (response.status === 201) {
      navigate("/dashboard/Roles");
      AlertSuccess("Rol creado", "El rol se ha creado correctamente");
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

  const checkRolName = async (rolName) => {
    try {
      const response = await getRols();

      const rols = response.data || [];
      return rols.some(
        (rol) => rol.name.trim().toLowerCase() === rolName.trim().toLowerCase()
      );
    } catch (error) {
      console.error("Error al verificar el nombre del rol: ", error);
      return false; // Asumimos que no existe para no bloquear la UI
    }
  };

  const validatorName = async () => {
    const name = formRol.name.trim();
    if (!name) return true; // Ya se valida en validateForm

    const nameExists = await checkRolName(name);
    if (nameExists) {
      setAlertError1({
        show: true,
        title: "Error",
        message: "Ya existe un rol con este nombre",
        type: "danger",
      });

      return false;
    }

    // Limpia el error si todo está bien
    setAlertError1((prev) => ({ ...prev, show: false }));
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
        <h2 className="mb-4 mt-3">Formulario de Roles</h2>

        {/* Mensaje de error para roles */}
        {alertError.show && (
          <div
            className={`alert alert-${alertError.type} alert-dismissible fade show mb-2`}
            role="alert"
          >
            <strong>{alertError.title}</strong> {alertError.message}
          </div>
        )}

        {alertError1.show && (
          <div
            className={`alert alert-${alertError1.type} alert-dismissible fade show mb-2`}
            role="alert"
          >
            <strong>{alertError1.title}</strong> {alertError1.message}
          </div>
        )}
        <form onSubmit={HandleSubmint}>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">
              Nombre
            </label>
            <input
              name="name"
              onBlur={validatorName}
              value={formRol.name}
              onChange={ChangeData}
              type="text"
              className="form-control"
              placeholder="Ingrese el nombre del rol"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="descripcion" className="form-label">
              Descripción
            </label>
            <textarea
              name="description"
              value={formRol.description}
              onChange={ChangeData}
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
