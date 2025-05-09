import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { AlertSuccess } from "../../../../../shared/alert/success";
import { getOneUser, putUsers, getUsers } from "../../services/users.service";
import { getRols } from "../../../roles/service/roles.service";
import { getCompanies } from "../../../companies/services/companies.service";
import { getRole } from "../../../layout.service";

// Función para normalizar nombres de roles
const normalizeRoleName = (name) => {
  if (!name) return "";
  const lowerName = name.toLowerCase().trim();

  // Parte de administrador
  if (lowerName.includes("admin")) return "administrador";
  if (lowerName.includes("administradora")) return "administrador";
  if (lowerName.includes("superadmin")) return "administrador";
  if (lowerName.includes("superadministrador")) return "administrador";
  if (lowerName.includes("superadmintradora")) return "administrador";
  if (lowerName.includes("gerente")) return "administrador";
  if (lowerName.includes("director")) return "administrador";

  // Parte de proveedor
  if (lowerName.includes("empresa")) return "proveedor";
  if (lowerName.includes("proveedora")) return "proveedor";
  if (lowerName.includes("abastecedor")) return "proveedor";
  if (lowerName.includes("abastecedora")) return "proveedor";
  if (lowerName.includes("provisor")) return "proveedor";
  if (lowerName.includes("provisora")) return "proveedor";
  if (lowerName.includes("suministrador")) return "proveedor";
  if (lowerName.includes("suministradora")) return "proveedor";
  if (lowerName.includes("distribuidor")) return "proveedor";
  if (lowerName.includes("distribuidora")) return "proveedor";
  if (lowerName.includes("agente")) return "proveedor";

  return "otro";
};
export const FormUserUpdate = () => {
  const [alertError, setAlertError] = useState({
    show: false,
    title: "",
    message: "",
    type: "danger",
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

  const [userRole, setUserRole] = useState(""); // Rol actual del usuario

  const isFromProfile = location.pathname.includes(`/dashboard/Usuario/${id}`);

  const handleNavigationAfterSave = () => {
    navigate(isFromProfile ? `/dashboard/Usuario/${id}` : "/dashboard/Usuarios");
  };

  const back = () => {
    navigate(isFromProfile ? `/dashboard/Usuario/${id}` : "/dashboard/Usuarios");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const checkUserEmail = async (email) => {
    try {
      const response = await getUsers();
      const users = response.data || [];
      return users.some(
        (user) =>
          user.id !== parseInt(id) &&
          user.email.toLowerCase() === email.toLowerCase()
      );
    } catch (error) {
      console.error("Error verificando correo:", error);
      return false;
    }
  };
  const validateForm = () => {
    // Verificar campos obligatorios
    if (!formUser.fullName.trim()) {
      setAlertError({
        show: true,
        title: "Error",
        message: "El nombre del Usuario es obligatorio",
        type: "danger",
      });
      return false;
    }
  
    if (!formUser.email.trim()) {
      setAlertError({
        show: true,
        title: "Error",
        message: "El Correo es obligatorio",
        type: "danger",
      });
      return false;
    }
    if (!formUser.companyId || formUser.companyId === "0") {
      setAlertError({
        show: true,
        title: "Error",
        message: "Debe seleccionar una Compañia",
        type: "danger",
      });
      return false;
    }
    if (!formUser.roleId || formUser.roleId === "0") {
      setAlertError({
        show: true,
        title: "Error",
        message: "Debe seleccionar un rol",
        type: "danger",
      });
      return false;
    }
  
    return true; // Todos los campos son válidos
  };
  const validateEmail = async () => {
    const email = formUser.email.trim();
    if (!email) return true;

    if (!validateForm()) {
      return;
    }
    const emailExists = await checkUserEmail(email);
    if (emailExists) {
      setAlertError({
        show: true,
        title: "Error",
        message: "El correo ya está registrado por otro usuario",
        type: "danger",
      });
      return false;
    }
    setAlertError((prev) => ({ ...prev, show: false }));
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValidEmail = await validateEmail();
    if (!isValidEmail) return;

    try {
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
        AlertSuccess("Usuario actualizado", "El usuario se ha actualizado correctamente");
        handleNavigationAfterSave();
      }
    } catch (error) {
      console.error("Error actualizando usuario:", error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
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

        const currentUser = JSON.parse(localStorage.getItem("User"));
        const rawRoleName = await getRole(parseInt(currentUser.roleId));;
        setUserRole(normalizeRoleName(rawRoleName.data.name)); 
        
      } catch (error) {
        console.error("Error cargando datos:", error);
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

      <div className="container mt-3">
        {alertError.show && (
          <div className={`alert alert-${alertError.type} alert-dismissible fade show`}>
            <strong>{alertError.title}</strong> {alertError.message}
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
            />
          </div>

          {userRole === "administrador" && (
            <div className="mb-3">
              <label className="form-label">Rol</label>
              <select
                name="roleId"
                value={formUser.roleId}
                onChange={handleChange}
                className="form-select"
              >
                <option value={0}>Seleccione un rol</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div className="mb-3">
            <label className="form-label">Compañía</label>
            <select
              name="companyId"
              value={formUser.companyId}
              onChange={handleChange}
              className="form-select"
            >
              <option value={0}>Seleccione una compañía</option>
              {companies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
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
