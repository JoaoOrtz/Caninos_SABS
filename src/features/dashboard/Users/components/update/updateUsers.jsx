import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AlertSuccess } from "../../../../../shared/alert/success";
import { getOneUser, putUsers } from "../../services/users.service";
import { getRols } from "../../../roles/service/roles.service";
import { getCompanies } from "../../../companies/services/companies.service";

export const FormUserUpdate = () => {
  const navegate = useNavigate();
  const { id } = useParams();
  const [companies, setCompanies] = useState([]);
  const [roles, setRoles] = useState([]);
  //Objeto de datos
  const [formUser, setFormUser] = useState({
    fullName: "",
    email: "",
    password: "",
    roleId: 0,
    companyId:0,
  });

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
  useEffect(() => {
    const data = async () => {
      if (id) {
        const response = await getOneUser(id);
        if (response.data) {
          setFormUser({
            fullName: response.data.fullName,
            email: response.data.email,
            roleId: response.data.roleId,
            companyId: response.data.companyId,
          });
        }
      }
    };
    data();
  }, [id]);

  //Funcion para recolección los datos
  const ChangeData = (e) => {
    const { name, value } = e.target;
    setFormUser({
      ...formUser,
      [name]: value,
    });
  };

  const HandleSubmint = async (e) => {
    e.preventDefault();
    const response = await putUsers(id, formUser);
    if (response.status === 200) {
      navegate("/dashboard/Usuarios");
      AlertSuccess(
        "Usuario actualizado",
        "El usuario se a actualizado correctamente"
      );
    }
  };

  const back = () => {
    navegate("/dashboard/Usuarios");
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
        <h2 className="mb-4 mt-3">Formulario de actualización de Usuario</h2>
        <form onSubmit={HandleSubmint}>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">
              Nombre
            </label>
            <input
              name="fullName"
              value={formUser.fullName}
              onChange={ChangeData}
              type="text"
              className="form-control"
              placeholder="Ingrese el nuevo nombre del producto"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="nombre" className="form-label">
              Correo Electronico
            </label>
            <input
              name="email"
              value={formUser.email}
              onChange={ChangeData}
              type="text"
              className="form-control"
              placeholder="Ingrese el nuevo correo del usuario"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="categoria" className="form-label">
              Rol
            </label>
            <select
              name="roleyId"
              value={formUser.roleId}
              onChange={ChangeData}
              className="form-select"
              id="role"
              required
            >
              <option key={0} value={0}>
                Seleccione un rol
              </option>
              {roles.map((e, i) => (
                <option key={i} value={e.id}>
                  {e.name}
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
              value={formUser.companyId}
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
