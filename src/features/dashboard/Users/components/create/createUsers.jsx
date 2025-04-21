import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertSuccess } from "../../../../../shared/alert/success";
import { getUsers, postUsers } from "../../services/users.service";
import { getRols } from "../../../roles/service/roles.service";
import { getCompanies } from "../../../companies/services/companies.service";

export const CreateUser = () => {
  const navigate = useNavigate(); // Corrige el nombre a "navigate" en lugar de "navegate"

  // Objeto de datos
  const [formUsers, setFormUsers] = useState({
    fullName: "",
    email: "",
    password: "", // Campo de contraseña
    roleId: 0,
    companyId: "",
  });

  const [alertError1, setAlertError1] = useState({
    show: false,
    title: "",
    message: "",
    type: "warning",
  });

  const [roles, setRoles] = useState([]);
  const [companies, setCompanies] = useState([]);

  // Cargar los roles cuando el componente se monte
  useEffect(() => {
    const loadRoles = async () => {
      const response = await getRols();
      setRoles(response.data);
    };

    loadRoles();
  }, []);
  // El array vacío asegura que solo se ejecute una vez al montar
  useEffect(() => {
    const loadCompanies = async () => {
      const response = await getCompanies();
      setCompanies(response.data);
    };

    loadCompanies();
  }, []);

  // Función para manejar el cambio de datos en el formulario
  const ChangeData = (e) => {
    const { name, value } = e.target;
    setFormUsers({
      ...formUsers,
      [name]: value,
    });
  };

  // Función para manejar el envío del formulario
  const HandleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    try {
      const response = await postUsers(formUsers);
      if (response.status === 201) {
        AlertSuccess("Usuario creado", "El usuario se ha creado correctamente");
        navigate("/dashboard/Usuarios"); // Redirige a la página de usuarios
      }
    } catch (error) {
      console.error("Error al crear el usuario", error);
    }
  };

  // Función para volver atrás
  const back = () => {
    navigate("/dashboard/Usuarios");
  };

  //Validacion de datos vacios
  const validateForm = () => {
    // Verificar campos obligatorios
    if (!formUsers.fullName.trim()) {
      setAlertError1({
        show: true,
        title: "Error",
        message: "El nombre del Usuario es obligatorio",
        type: "danger",
      });
      return false;
    }

    if (!formUsers.email.trim()) {
      setAlertError1({
        show: true,
        title: "Error",
        message: "El Correo es obligatorio",
        type: "danger",
      });
      return false;
    }

    if (!formUsers.password.trim()) {
      setAlertError1({
        show: true,
        title: "Error",
        message: "La contraseña obligatoria",
        type: "danger",
      });
      return false;
    }
    if (!formUsers.companyId || formUsers.companyId === "0") {
      setAlertError1({
        show: true,
        title: "Error",
        message: "Debe seleccionar una Compañia",
        type: "danger",
      });
      return false;
    }
    if (!formUsers.roleId || formUsers.roleId === "0") {
      setAlertError1({
        show: true,
        title: "Error",
        message: "Debe seleccionar un rol",
        type: "danger",
      });
      return false;
    }

    return true; // Todos los campos son válidos
  };

      const checkUserEmail = async (userEmail) => {
          try {
              const response = await getUsers();
              const users = response.data|| [];
              return users.some(users => 
                  users.email.trim().toLowerCase() === userEmail.trim().toLowerCase()
              );
          } catch (error) {
              console.error("Error al verificar el nombre del producto:", error);
              return false; // Asumimos que no existe para no bloquear la UI
          }
      };
  const validatorEmail = async () => {
    const email = formUsers.email.trim();
    if (!email) return true; // Ya se valida en validateForm
    const emailExists = await checkUserEmail(email);
    if (emailExists) {
      setAlertError1({
        show: true,
        title: "Error",
        message: "Ya existe un Usuario con este correo",
        type: "danger",
      });
      return false;
    }

    // Limpia el error si todo está bien
    setAlertError1((prev) => ({ ...prev, show: false }));
    return true;
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
        <h2 className="mb-4 mt-3">Formulario de Usuarios</h2>

        {alertError1.show && (
          <div
            className={`alert alert-${alertError1.type} alert-dismissible fade show mb-2`}
            role="alert"
          >
            <strong>{alertError1.title}</strong> {alertError1.message}
          </div>
        )}
        <form onSubmit={HandleSubmit}>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">
              Nombre
            </label>
            <input
              name="fullName" // Corrige el "name" para que coincida con el estado
              value={formUsers.fullName}
              onChange={ChangeData}
              type="text"
              className="form-control"
              placeholder="Ingrese el nombre del usuario"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="descripcion" className="form-label">
              Correo
            </label>
            <input
              name="email"
              value={formUsers.email}
              onBlur={validatorEmail}
              onChange={ChangeData}
              type="email"
              className="form-control"
              placeholder="Ingrese el correo del usuario"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="descripcion" className="form-label">
              Contraseña
            </label>
            <input
              name="password" // Aquí corriges el campo para que sea "password"
              value={formUsers.password}
              onChange={ChangeData}
              type="password" // Usa tipo "password" para ocultar la contraseña
              className="form-control"
              placeholder="Ingrese la contraseña del usuario"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="rol" className="form-label">
              Rol
            </label>
            <select
              name="roleId" // Corrige el nombre a "roleId"
              value={formUsers.roleId}
              onChange={ChangeData}
              className="form-select"
              id="role"
              required
            >
              <option value={0}>Seleccione un rol</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label htmlFor="rol" className="form-label">
              Compañia
            </label>
            <select
              name="companyId" // Corrige el nombre a "roleId"
              value={formUsers.companyId}
              onChange={ChangeData}
              className="form-select"
              id="company"
              required
            >
              <option value={0}>Seleccione una compañia</option>
              {companies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-primary">
            Guardar
          </button>
        </form>
      </div>
    </>
  );
};
