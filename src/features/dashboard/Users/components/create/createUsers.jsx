import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AlertSuccess } from "../../../../../shared/alert/success";
import { postUsers } from "../../services/users.service";
import { getRols } from "../../../roles/service/roles.service";

export const CreateUser = () => {
  const navigate = useNavigate();  // Corrige el nombre a "navigate" en lugar de "navegate"

  // Objeto de datos
  const [formUsers, setFormUsers] = useState({
    fullName: "",
    email: "",
    password: "",  // Campo de contraseña
    roleId: 0,
    companyId: ""
  });

  const [roles, setRoles] = useState([]);

  // Cargar los roles cuando el componente se monte
  useEffect(() => {
    const loadRoles = async () => {
        const response = await getRols();
        setRoles(response.data);
    };

    loadRoles();
  }, []);  // El array vacío asegura que solo se ejecute una vez al montar

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
    try {
      const response = await postUsers(formUsers);
      console.log(response);
      if (response.data.status === "success") {
        AlertSuccess("Usuario creado", "El usuario se ha creado correctamente");
        navigate("/dashboard/Usuarios");  // Redirige a la página de usuarios
      }
    } catch (error) {
      console.error("Error al crear el usuario", error);
    }
  };

  // Función para volver atrás
  const back = () => {
    navigate("/dashboard/Usuarios");
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
        <form onSubmit={HandleSubmit}>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">
              Nombre
            </label>
            <input
              name="fullName"  // Corrige el "name" para que coincida con el estado
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
              name="password"  // Aquí corriges el campo para que sea "password"
              value={formUsers.password}
              onChange={ChangeData}
              type="password"  // Usa tipo "password" para ocultar la contraseña
              className="form-control"
              placeholder="Ingrese la contraseña del usuario"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="rol" className="form-label">
              Rol
            </label>
            <select
              name="roleId"  // Corrige el nombre a "roleId"
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

          <button type="submit" className="btn btn-primary">
            Guardar
          </button>
        </form>
      </div>
    </>
  );
};
