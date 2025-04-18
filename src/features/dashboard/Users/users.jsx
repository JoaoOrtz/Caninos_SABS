import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { MdDelete } from "react-icons/md";
import { RiEditBoxLine } from "react-icons/ri";
import {getUsers } from "./services/users.service";
import { AlertDelete } from "./components/delete/deleteUsers";
import { SeeUser } from "./components/read/readUsers";


export const UserDashboard = () => {
  const navegation = useNavigate();
  const [dataUsers, setDataUsers] = useState([]);

  //Trae los Usuarios
  useEffect(() => {
    const data = async () => {
      const response = await getUsers();
      setDataUsers(response.data);
    };
    data();
  }, []);
  const viewForm = () => {
    navegation("/dashboard/nuevo-user");
  };

  const viewUpdate = (id) => {
    navegation("/dashboard/editar-user/" + id);
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row g-3 p-2 align-items-center">
          <div className="col">
            <h2>Lista De Usuarios</h2>
          </div>
          <div className="col-auto ms-auto">
            <button
              type="button"
              className="btn btn-primary"
              onClick={viewForm}
            >
              Nuevo Usuario
            </button>
          </div>
        </div>
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
                <th scope="col">Compañia</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {dataUsers.map((e, i) => (
                <tr key={i}>
                  <td>{e.id}</td>
                  <td>{e.fullName}</td>
                  <td>{e.email}</td>
                  <td>{e.password}</td>
                  <td>${e.role.name}</td>
                  <td>{e.company.name}</td>
                  <td>
                    <div className="btn-group" role="group">
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm"
                        onClick={() =>
                          AlertDelete(
                            e.id,
                            "¿De seguro quieres eliminar el Usuario?",
                            `El usuario que quieres eliminar es ${e.fullname}`
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
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
