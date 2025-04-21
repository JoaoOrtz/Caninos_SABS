import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { MdDelete } from "react-icons/md";
import { RiEditBoxLine } from "react-icons/ri";
import {getUsers } from "./services/users.service";
import { AlertDelete } from "./components/delete/deleteUsers";
import { SeeUser } from "./components/read/readUsers";
import { getRols } from "../roles/service/roles.service";
import { getCompanies } from "../companies/services/companies.service";

export const UserDashboard = () => {
  const navigation = useNavigate(); // Corregido el nombre
  const [dataUsers, setDataUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [userError, setUserError] = useState({
    show: false,
    title: "",
    message: "",
    type: "warning",
  });
  const [roleError, setRoleError] = useState({
    show: false,
    title: "",
    message: "",
    type: "warning",
  });
  const [companyError, setCompanyError] = useState({
    show: false,
    title: "",
    message: "",
    type: "warning",
  });

  const checkRole = (roles) => {
    if (!roles || roles.length === 0) {
      setRoleError({
        show: true,
        title: "Aviso",
        message: "No tuene ningun rol creado",
        type: "warning",
      });
      return true;
    }
    setRoleError({ ...roleError, show: false });
    return false;
  };

  const checkCompany = (company) => {
    if (!company || company.length === 0) {
      setCompanyError({
        show: true,
        title: "Aviso",
        message: "No tiene ninguna compañia creada.",
        type: "warning",
      });
      return true;
    }
    setCompanyError({ ...companyError, show: false });
    return false;
  };

  // Cargar los roles cuando el componente se monte
  useEffect(() => {
    const loadRoles = async () => {
      const response = await getRols();
      setRoles(response.data);
      checkRole(response.data);
    };
    loadRoles();
  }, []);
  useEffect(() => {
    const loadCompanies = async () => {
      const response = await getCompanies();
      setCompanies(response.data);
      checkCompany(response.data)
    };
    loadCompanies();
  }, []);

  // Verificar Usuarios
  const checkUsers = (users) => {
    if (!users || users.length === 0) {
      setUserError({
        show: true,
        title: "Aviso",
        message: "No se encontró ningún usuario.",
        type: "warning",
      });
      return true;
    }
    setUserError({ ...userError, show: false });
    return false;
  };

  // Traer los Usuarios
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        let response = await getUsers();
        let users = response.data || [];  
        setDataUsers(users);
        checkUsers(users);
      } catch (error) {
        console.error("Error al traer los usuarios:", error);
        setUserError({
          show: true,
          title: "Error",
          message: "Ocurrió un error al cargar los usuarios.",
          type: "danger",
        });
      }
    };
    fetchUsers();
  }, []);
  

  const viewForm = () => {
    navigation("/dashboard/nuevo-user");
  };

  const viewUpdate = (id) => {
    navigation("/dashboard/editar-user/" + id);
  };
  useEffect(() => {
    if (roleError.show) {
      const popoverTriggerList = [].slice.call(
        document.querySelectorAll('[data-bs-toggle="popover"]')
      );
      popoverTriggerList.map(function (popoverTriggerEl) {
        return new window.bootstrap.Popover(popoverTriggerEl);
      });
    }
  }, [roleError.show]);
  return (
    <div className="container-fluid">
      <div className="row g-3 p-2 align-items-center">
        <div className="col">
          <h2>Lista De Usuarios</h2>
        </div>
        <div className="col-auto ms-auto">
          {roleError.show ? (
            <button
              type="button"
              className="btn btn-primary"
              data-bs-container="body"
              data-bs-toggle="popover"
              data-bs-trigger="focus"
              data-bs-placement="bottom"
              data-bs-content="No puedes agregar Usuarios sin Roles ni Compañias Primero crea al menos una de cada una."
              title="Acción no disponible"
            >
              Nuevo Usuario
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-primary"
              onClick={viewForm}
            >
              Nuevo Usuario
            </button>
          )}
        </div>
      </div>

      {/* Mostrar alerta de error si aplica */}
      {userError.show && (
        <div
          className={`alert alert-${userError.type} alert-dismissible fade show mb-2`}
          role="alert"
        >
          <strong>{userError.title}</strong> {userError.message}
        </div>
      )}
      {roleError.show && (
        <div
          className={`alert alert-${roleError.type} alert-dismissible fade show mb-2`}
          role="alert"
        >
          <strong>{roleError.title}</strong> {roleError.message}
        </div>
      )}
      {companyError.show && (
        <div
          className={`alert alert-${companyError.type} alert-dismissible fade show mb-2`}
          role="alert"
        >
          <strong>{companyError.title}</strong> {companyError.message}
        </div>
      )}

      <div className="table-responsive">
        <table
          className="table table-hover align-middle shadow-sm"
          style={{
            backgroundColor: "#fff",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
          <thead style={{ backgroundColor: "#f0f0f0" }}>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre</th>
              <th scope="col">Email</th>
              <th scope="col">Contraseña</th>
              <th scope="col">Rol</th>
              <th scope="col">Compañía</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {dataUsers.map((e, i) => (
              <tr key={i}>
                <td>{e.id}</td>
                <td>{e.fullName}</td>
                <td>{e.email}</td>
                <td title={e.password}>{e.password.slice(0, 10)}...</td>
                <td>{e.role?.name || "Sin rol"}</td>
                <td>{e.company?.name || "Sin compañía"}</td>
                <td>
                  <div className="btn-group" role="group">
                    {e.id===1 ? <SeeUser id={e.id} />:
                    <>
                    
                    <button
                      type="button"
                      className="btn btn-outline-danger btn-sm"
                      onClick={() =>
                        AlertDelete(
                          e.id,
                          "¿De seguro quieres eliminar el Usuario?",
                          `El usuario que quieres eliminar es ${e.fullName}`,
                          () => {
                            getUsers().then((response) => {
                              const updatedUsers = response.data || [];
                              setDataUsers(updatedUsers);
                            });
                          }
                        )
                      }

                    >
                      <MdDelete />
                    </button>
                    <SeeUser id={e.id} />
                    <button
                      type="button"
                      className="btn btn-outline-success btn-sm"
                      onClick={() => viewUpdate(e.id)}
                      >
                      <RiEditBoxLine />
                    </button>
                  </>
                  }
                  </div>
                </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
