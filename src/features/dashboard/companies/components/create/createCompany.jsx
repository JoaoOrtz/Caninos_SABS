import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AlertSuccess } from "../../../../../shared/alert/success";
import { getCompanies, postCompany } from "../../services/companies.service";

export const CreateCompany = () => {
  const navigate = useNavigate();

  // Objeto de datos
  const [formCompany, setFormCompany] = useState({
    name: "",
    nit: "",
    address: "",
    phone: "",
    email: "",
  });

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

  // Función para recolección de los datos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormCompany({
      ...formCompany,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isNameValid = await validateName();
    if (!isNameValid) return;

    if (!validateForm()) {
      return;
    }

    try {
      const response = await postCompany(formCompany);

      console.log("Response:", response); // Agregar un log para verificar la respuesta
      if (response && response.data && response.data.status === "success") {
        navigate("/dashboard/Compañias");
        AlertSuccess(
          "Compañía creada",
          "La compañía se ha creado correctamente"
        );
      } else {
        // Manejo de un caso en el que la respuesta no sea la esperada
        setAlertError({
          show: true,
          title: "Error",
          message: "Hubo un problema al crear la compañía. Intenta de nuevo.",
          type: "danger",
        });
      }
    } catch (error) {
      console.error("Error creating company:", error);
      setAlertError({
        show: true,
        title: "Error",
        message: error.response?.data?.message || "Error al crear la compañía",
        type: "danger",
      });
    }
  };

  // Validación de datos vacíos
  const validateForm = () => {
    // Verificar campos obligatorios
    console.log(formCompany); // Ver qué datos estamos validando
    if (!formCompany.name.trim()) {
      setAlertError({
        show: true,
        title: "Error",
        message: "El nombre de la compañía es obligatorio",
        type: "danger",
      });
      return false;
    }

    // Verificación de descripción si la incluyes
    if (formCompany.description && formCompany.description.length > 255) {
      setAlertError({
        show: true,
        title: "Error",
        message: "La descripción no puede exceder 255 caracteres",
        type: "danger",
      });
      return false;
    }

    // Validación de teléfono
    if (formCompany.phone && !/^\d{7,15}$/.test(formCompany.phone)) {
      setAlertError({
        show: true,
        title: "Error",
        message: "Teléfono inválido (solo números, 7-15 dígitos)",
        type: "danger",
      });
      return false;
    }

    // Validación de NIT
    if (formCompany.nit && !/^\d{6,15}-\d{1}$/.test(formCompany.nit)) {
      setAlertError({
        show: true,
        title: "Error",
        message: "NIT inválido (debe ser en formato 900123456-7)",
        type: "danger",
      });
      return false;
    }

    // Validación de email
    if (
      formCompany.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formCompany.email)
    ) {
      setAlertError({
        show: true,
        title: "Error",
        message: "Email inválido",
        type: "danger",
      });
      return false;
    }

    return true; // Todos los campos son válidos
  };

  const checkCompanyName = async (companyName) => {
    try {
      const response = await getCompanies();
      const companies = response.data.companies || [];
      return companies.some(
        (company) =>
          company.name.trim().toLowerCase() === companyName.trim().toLowerCase()
      );
    } catch (error) {
      console.error("Error al verificar el nombre de la compañía:", error);
      return false; // Asumimos que no existe para no bloquear la UI
    }
  };

  const validateName = async () => {
    const name = formCompany.name.trim();
    if (!name) return true; // Ya se valida en validateForm

    const nameExists = await checkCompanyName(name);
    if (nameExists) {
      setAlertError1({
        show: true,
        title: "Error",
        message: "Ya existe una compañía con este nombre",
        type: "danger",
      });
      return false;
    }

    // Limpia el error si todo está bien
    setAlertError1((prev) => ({ ...prev, show: false }));
    return true;
  };

  const back = () => {
    navigate("/dashboard/Compañias");
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
        <h2 className="mb-4 mt-3">Crear Nueva Compañía</h2>

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

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">
              Nombre *
            </label>
            <input
              name="name"
              value={formCompany.name}
              onChange={handleChange}
              onBlur={validateName}
              type="text"
              className="form-control"
              placeholder="Ingrese el nombre de la compañía"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="direccion" className="form-label">
              Dirección
            </label>
            <input
              name="address"
              value={formCompany.address}
              onChange={handleChange}
              type="text"
              className="form-control"
              placeholder="Ingrese la dirección"
            />
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label htmlFor="telefono" className="form-label">
                Teléfono
              </label>
              <input
                name="phone"
                value={formCompany.phone}
                onChange={handleChange}
                type="tel"
                className="form-control"
                placeholder="Ej: 573012345678"
                pattern="[0-9]{7,15}"
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="nit" className="form-label">
                NIT
              </label>
              <input
                name="nit"
                value={formCompany.nit}
                onChange={handleChange}
                type="text"
                className="form-control"
                placeholder="Número de Identificación Tributaria (Ej: 900123456-7)"
                pattern="^\d{6,15}-\d{1}$"
                required
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              name="email"
              value={formCompany.email}
              onChange={handleChange}
              type="email"
              className="form-control"
              placeholder="correo@empresa.com"
            />
          </div>

          <button type="submit" className="btn btn-primary me-2">
            Guardar
          </button>
          <button type="button" onClick={back} className="btn btn-secondary">
            Cancelar
          </button>
        </form>
      </div>
    </>
  );
};
