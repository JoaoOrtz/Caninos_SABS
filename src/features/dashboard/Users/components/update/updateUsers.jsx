import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AlertSuccess } from "../../../../../shared/alert/success";
import { getOneUser, putUsers, getUsers } from "../../services/users.service";
import { getRols } from "../../../roles/service/roles.service";
import { getCompanies } from "../../../companies/services/companies.service";

export const FormUserUpdate = () => {
  const [alertError1, setAlertError1] = useState({
    show: false,
    title: "",
    message: "",
    type: "warning",
  });
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  const [companies, setCompanies] = useState([]);
  const [roles, setRoles] = useState([]);
  
  const [formUser, setFormUser] = useState({
    fullName: "",
    email: "",
    roleId: 0,
    companyId: 0,
  });

  // Cargar roles
  useEffect(() => {
    const loadRoles = async () => {
      try {
        const response = await getRols();
        setRoles(response.data);
      } catch (error) {
        console.error("Error cargando roles:", error);
      }
    };
    loadRoles();
  }, []);

  // Cargar compañías
  useEffect(() => {
    const loadCompanies = async () => {
      try {
        const response = await getCompanies();
        setCompanies(response.data);
      } catch (error) {
        console.error("Error cargando compañías:", error);
      }
    };
    loadCompanies();
  }, []);

  // Cargar datos del usuario
  useEffect(() => {
    const loadUser = async () => {
      if (!id) return;
      
      try {
        const response = await getOneUser(id);
        if (response.data) {
          setFormUser({
            fullName: response.data.fullName,
            email: response.data.email,
            roleId: response.data.roleId,
            companyId: response.data.companyId,
          });
        }
      } catch (error) {
        console.error("Error cargando usuario:", error);
      }
    };
    loadUser();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const checkUserEmail = async (email) => {
    try {
      const response = await getUsers();
      const users = response.data || [];
      return users.some(user => 
        user.id !== parseInt(id) && 
        user.email.toLowerCase() === email.toLowerCase()
      );
    } catch (error) {
      console.error("Error verificando correo:", error);
      return false;
    }
  };

  const validateEmail = async () => {
    const email = formUser.email.trim();
    if (!email) return true;
    
    const emailExists = await checkUserEmail(email);
    if (emailExists) {
      setAlertError1({
        show: true,
        title: "Error",
        message: "El correo ya está registrado por otro usuario",
        type: "danger",
      });
      return false;
    }
    setAlertError1(prev => ({ ...prev, show: false }));
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const isValidEmail = await validateEmail();
    if (!isValidEmail) return;

    try {
      const response = await putUsers(id, formUser);
      if (response.status === 200) {
        navigate("/dashboard/Usuarios");
        AlertSuccess("Usuario actualizado", "Cambios guardados exitosamente");
      }
    } catch (error) {
      console.error("Error actualizando usuario:", error);
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => navigate("/dashboard/Usuarios")}
        className="btn btn-primary rounded-circle p-2"
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

      <div className="container mt-3">
        {alertError1.show && (
          <div className={`alert alert-${alertError1.type} alert-dismissible fade show`}>
            <strong>{alertError1.title}</strong> {alertError1.message}
          </div>
        )}

        <h2 className="mb-4">Editar Usuario</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nombre completo</label>
            <input
              name="fullName"
              value={formUser.fullName}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Correo electrónico</label>
            <input
              type="email"
              name="email"
              value={formUser.email}
              onChange={handleChange}
              onBlur={validateEmail}
              className="form-control"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Rol</label>
            <select
              name="roleId"
              value={formUser.roleId}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value={0}>Seleccione un rol</option>
              {roles.map(role => (
                <option key={role.id} value={role.id}>{role.name}</option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Compañía</label>
            <select
              name="companyId"
              value={formUser.companyId}
              onChange={handleChange}
              className="form-select"
              required
            >
              <option value={0}>Seleccione una compañía</option>
              {companies.map(company => (
                <option key={company.id} value={company.id}>{company.name}</option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-primary">
            Guardar cambios
          </button>
        </form>
      </div>
    </>
  );
};