import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AlertSuccess } from "../../../../../shared/alert/success";
import { getCompanies, getCompany, putCompany } from "../../services/companies.service";

export const UpdateCompany = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Objeto de datos
  const [formCompany, setFormCompany] = useState({
    name: "",
    address: "",
    phone: "",
    nit: "",
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

  // Cargar datos de la compañía al montar el componente
  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await getCompany(id);
        if (response.data) {
          setFormCompany({
            name: response.data.name || "",
            description: response.data.description || "",
            address: response.data.address || "",
            phone: response.data.phone || "",
            nit: response.data.nit || "",
            email: response.data.email || "",
          });
        }
      } catch (error) {
        console.error("Error fetching company data:", error);
        setAlertError({
          show: true,
          title: "Error",
          message: "No se pudo cargar los datos de la compañía",
          type: "danger",
        });
      }
    };

    fetchCompanyData();
  }, [id]);

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
    if (!validateName()) {
      return;
    }

    if (!validateForm()) {
      return;
    }

    try {
      const response = await putCompany(id, formCompany);
      console.log(response);
      
      if (response.status === 200) {
        navigate("/dashboard/Compañias");
        AlertSuccess(
          "Compañía actualizada",
          "La compañía se ha actualizado correctamente"
        );
      }
    } catch (error) {
      console.error("Error updating company:", error);
      setAlertError({
        show: true,
        title: "Error",
        message:
          error.response?.data?.message || "Error al actualizar la compañía",
        type: "danger",
      });
    }
  };

  // Validación de datos
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

    if (formCompany.description && formCompany.description.length > 255) {
      setAlertError({
        show: true,
        title: "Error",
        message: "La descripción no puede exceder 255 caracteres",
        type: "danger",
      });
      return false;
    }

    if (formCompany.phone && !/^\d{7,15}$/.test(formCompany.phone)) {
      setAlertError({
        show: true,
        title: "Error",
        message: "Teléfono inválido (solo números, 7-15 dígitos)",
        type: "danger",
      });
      return false;
    }

    if (formCompany.nit && !/^\d{6,15}-\d{1,2}$/.test(formCompany.nit)) {
        setAlertError({
          show: true,
          title: "Error",
          message: "NIT inválido. Usa el formato 900123456-7",
          type: "danger",
        });
        return false;
      }
      

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
          company.name.trim().toLowerCase() ===
            companyName.trim().toLowerCase() && company.id !== id // Excluir la compañía actual de la validación
      );
    } catch (error) {
      console.error("Error al verificar el nombre de la compañía:", error);
      return false;
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
        <h2 className="mb-4 mt-3">Editar Compañía</h2>

        {/* Mensajes de error */}
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
                placeholder="Número de Identificación Tributaria"
                pattern="^[0-9]{6,15}-[0-9]{1}$"

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
            Actualizar
          </button>
        </form>
      </div>
    </>
  );
};
