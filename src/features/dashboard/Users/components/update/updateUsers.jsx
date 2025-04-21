import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AlertSuccess } from "../../../../../shared/alert/success";
import { getOneUser, putUsers } from "../../services/users.service";
import { getRols } from "../../../roles/service/roles.service";
import { getCompanies } from "../../../companies/services/companies.service";

export const FormUserUpdate = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const [companies, setCompanies] = useState([]);
  const [roles, setRoles] = useState([]);
  const [formUser, setFormUser] = useState({
    fullName: "",
    email: "",
    password: "",
    roleId: 0,
    companyId: 0,
  });

  const isFromProfile = location.pathname.includes(`/dashboard/Usuario/${id}`);

  const handleNavigationAfterSave = () => {
    navigate(isFromProfile ? `/dashboard/Usuario/${id}` : "/dashboard/Usuarios");
  };

  const back = () => {
    navigate(isFromProfile ? `/dashboard/Usuario/${id}` : "/dashboard/Usuarios");
  };

  const ChangeData = (e) => {
    const { name, value } = e.target;
    setFormUser({
      ...formUser,
      [name]: value,
    });
  };

  const HandleSubmit = async (e) => {
    e.preventDefault();
    const response = await putUsers(id, formUser);
    if (response.status === 200) {
      const currentUser = JSON.parse(localStorage.getItem("User"));
      if (currentUser && currentUser.id === parseInt(id)) {
        const updatedUser = {
          ...currentUser,
          fullName: formUser.fullName,
          email: formUser.email,
          roleId: formUser.roleId,
          companyId: formUser.companyId,
        };
        localStorage.setItem("User", JSON.stringify(updatedUser));
      }
      handleNavigationAfterSave();
      AlertSuccess("Usuario actualizado", "El usuario se ha actualizado correctamente");
    }
  };

  useEffect(() => {
    const loadData = async () => {
      const [rolesRes, companiesRes, userRes] = await Promise.all([
        getRols(),
        getCompanies(),
        id ? getOneUser(id) : Promise.resolve(null),
      ]);

      setRoles(rolesRes.data);
      setCompanies(companiesRes.data);

      if (userRes?.data) {
        setFormUser({
          fullName: userRes.data.fullName,
          email: userRes.data.email,
          roleId: userRes.data.roleId,
          companyId: userRes.data.companyId,
        });
      }
    };

    loadData();
  }, [id]);

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
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </button>

      <div className="container">
        <h2 className="mb-4 mt-3">Formulario de actualización de Usuario</h2>
        <form onSubmit={HandleSubmit}>
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
              name="roleId"
              value={formUser.roleId}
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
              name="companyId"
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