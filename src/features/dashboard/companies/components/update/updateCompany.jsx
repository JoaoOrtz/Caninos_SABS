import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AlertSuccess } from "../../../../../shared/alert/success";
import { getCompanies, getCompany, putCompany } from "../../services/companies.service";

export const UpdateCompany = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formCompany, setFormCompany] = useState({
    name: "",
    address: "",
    phone: "",
    nit: "",
    email: "",
  });

  const [originalValues, setOriginalValues] = useState({
    name: "",
    nit: "",
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

          setOriginalValues({
            name: response.data.name || "",
            nit: response.data.nit || "",
            phone: response.data.phone || "",
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormCompany({
      ...formCompany,
      [name]: value,
    });
  };

  const validateForm = () => {
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

    if (formCompany.nit && !/^\d{6,15}-\d{1}$/.test(formCompany.nit)) {
      setAlertError({
        show: true,
        title: "Error",
        message: "NIT inválido. Usa el formato 900123456-7",
        type: "danger",
      });
      return false;
    }

    if (formCompany.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formCompany.email)) {
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

  const validateUniqueFields = async () => {
    try {
      const response = await getCompanies();
      const companies = response?.data || [];

      const errors = [];

      const checkChanged = (field) =>
        formCompany[field].trim().toLowerCase() !==
        (originalValues[field] || "").trim().toLowerCase();

      if (checkChanged("name")) {
        const nameExists = companies.some(
          (c) =>
            c.name.trim().toLowerCase() === formCompany.name.trim().toLowerCase() &&
            c.id !== id
        );
        if (nameExists) errors.push("nombre");
      }

      if (checkChanged("nit")) {
        const nitExists = companies.some(
          (c) => c.nit === formCompany.nit && c.id !== id
        );
        if (nitExists) errors.push("NIT");
      }

      if (checkChanged("phone")) {
        const phoneExists = companies.some(
          (c) => c.phone === formCompany.phone && c.id !== id
        );
        if (phoneExists) errors.push("teléfono");
      }

      if (checkChanged("email")) {
        const emailExists = companies.some(
          (c) => c.email === formCompany.email && c.id !== id
        );
        if (emailExists) errors.push("email");
      }

      if (errors.length > 0) {
        setAlertError1({
          show: true,
          title: "Error",
          message: `Ya existe una compañía con este ${errors.join(", ")}`,
          type: "danger",
        });
        return false;
      }

      setAlertError1((prev) => ({ ...prev, show: false }));
      return true;
    } catch (error) {
      console.error("Error validando unicidad:", error);
      return true;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    if (!(await validateUniqueFields())) return;

    try {
      const response = await putCompany(id, formCompany);
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
            <label className="form-label">Nombre</label>
            <input
              name="name"
              onBlur={validateUniqueFields}
              value={formCompany.name}
              onChange={handleChange}
              type="text"
              className="form-control"
              placeholder="Ingrese el nombre de la compañía"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Dirección</label>
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
              <label className="form-label">Teléfono</label>
              <input
                name="phone"
                value={formCompany.phone}
                onChange={handleChange}
                onBlur={validateUniqueFields}

                type="tel"
                className="form-control"
                placeholder="Ej: 573012345678"
                pattern="[0-9]{7,15}"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">NIT</label>
              <input
                name="nit"
                value={formCompany.nit}
                onChange={handleChange}
                onBlur={validateUniqueFields}

                type="text"
                className="form-control"
                placeholder="Número de Identificación Tributaria"
                pattern="^[0-9]{6,15}-[0-9]{1}$"
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              name="email"
              value={formCompany.email}
              onBlur={validateUniqueFields}

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
