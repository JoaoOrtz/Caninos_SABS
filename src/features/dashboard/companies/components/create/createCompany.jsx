import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertSuccess } from "../../../../../shared/alert/success";
import { getCompanies, postCompany } from "../../services/companies.service";

export const CreateCompany = () => {
  const navigate = useNavigate();

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormCompany({
      ...formCompany,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Validar unicidad de todos los campos relevantes
    const isUnique = await validatorExisting();
    if (!isUnique) {
      return;
    }

    try {
      const response = await postCompany(formCompany);
      if (response.status === 201) {
        navigate("/dashboard/Compañias");
        AlertSuccess("Compañía creada", "La compañía se ha creado correctamente");
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

  const validateForm = () => {
    // Verificar campos obligatorios
    if (!formCompany.name.trim()) {
      setAlertError({
        show: true,
        title: "Error",
        message: "El nombre de la compañía es obligatorio",
        type: "danger",
      });
      return false;
    }

    if (!formCompany.address.trim()) {
      setAlertError({
        show: true,
        title: "Error",
        message: "La dirección de la compañía es obligatorio",
        type: "danger",
      });
      return false;
    }

    if (!formCompany.phone || parseInt(formCompany.phone) <= 0) {
      setAlertError({
        show: true,
        title: "Error",
        message: "El teléfono de la compañía es obligatorio",
        type: "danger",
      });
      return false;
    }

    if (!formCompany.nit.trim()) {
      setAlertError({
        show: true,
        title: "Error",
        message: "El NIT es obligatorio",
        type: "danger",
      });
      return false;
    }

    if (!formCompany.email.trim()) {
      setAlertError({
        show: true,
        title: "Error",
        message: "El correo es obligatorio",
        type: "danger",
      });
      return false;
    }


    // Validación de NIT
    if (!/^\d{9}-\d{1}$/.test(formCompany.nit)) {
      setAlertError({
        show: true,
        title: "Error",
        message: "NIT inválido y solo debe de tener 9 digitos y 1 digito despues del guion (debe ser en formato 123456789-7)",
        type: "danger",
      });
      return false;
    }

    // Validación de teléfono
    if (!/^\d{10}$/.test(formCompany.phone)) {
      setAlertError({
        show: true,
        title: "Error",
        message: "Teléfono inválido, solamente debe de tener 10 digitos",
        type: "danger",
      });
      return false;
    }

    // Validación de email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formCompany.email)) {
      setAlertError({
        show: true,
        title: "Error",
        message: "Email inválido",
        type: "danger",
      });
      return false;
    }

    return true;
  };

  const checkCompanyUniqueness = async () => {
    try {
      const response = await getCompanies();

      const companies = response?.data || [];

      const nitExists = companies.some(
        company => company.nit === formCompany.nit
      );

      const emailExists = formCompany.email && companies.some(
        company => company.email === formCompany.email
      );

      const phoneExists = formCompany.phone && companies.some(
        company => company.phone === formCompany.phone
      );

      return { nitExists, emailExists, phoneExists };
    } catch (error) {
      console.error("Error al verificar datos de la compañía:", error);
      return { nitExists: false, emailExists: false, phoneExists: false };
    }
  };

  const validatorExisting = async () => {
    const { nitExists, emailExists, phoneExists } = await checkCompanyUniqueness();
    const nameExists = await checkCompanyName(formCompany.name.trim());

    let isValid = true;

    if (nitExists) {
      setAlertError1({
        show: true,
        title: "Error",
        message: "Ya existe una compañía con este NIT",
        type: "danger",
      });
      isValid = false;
    }

    if (emailExists) {
      setAlertError1({
        show: true,
        title: "Error",
        message: "Ya existe una compañía con este email",
        type: "danger",
      });
      isValid = false;
    }

    if (phoneExists) {
      setAlertError1({
        show: true,
        title: "Error",
        message: "Ya existe una compañía con este teléfono",
        type: "danger",
      });
      isValid = false;
    }

    if (nameExists) {
      setAlertError1({
        show: true,
        title: "Error",
        message: "Ya existe una compañía con este nombre",
        type: "danger",
      });
      isValid = false;
    }

    // Si todo está bien, limpiamos los errores
    if (isValid) {
      setAlertError1((prev) => ({ ...prev, show: false }));
    }

    return isValid;
  };

  const checkCompanyName = async (companyName) => {
    try {
      const response = await getCompanies();
      const companies = response?.data || [];
      return companies.some(
        (company) =>
          company.name.trim().toLowerCase() === companyName.trim().toLowerCase()
      );
    } catch (error) {
      console.error("Error al verificar el nombre de la compañía:", error);
      return false;
    }
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
              Nombre
            </label>
            <input
              name="name"
              value={formCompany.name}
              onChange={handleChange}
              onBlur={validatorExisting}
              type="text"
              className="form-control"
              placeholder="Ingrese el nombre de la compañía"
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
                onBlur={validatorExisting}
                type="tel"
                className="form-control"
                placeholder="Ej: 3012345678"
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
                onBlur={validatorExisting}
                type="text"
                className="form-control"
                placeholder="Número de Identificación Tributaria (Ej: 900123456-7)"
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Correo electrónico
            </label>
            <input
              name="email"
              value={formCompany.email}
              onChange={handleChange}
              onBlur={validatorExisting}
              type="text"
              className="form-control"
              placeholder="correo@empresa.com"
            />
          </div>

          <button type="submit" className="btn btn-primary me-2">
            Guardar
          </button>
        </form>
      </div>
    </>
  );
};