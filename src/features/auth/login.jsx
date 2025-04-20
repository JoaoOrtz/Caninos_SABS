import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Landing } from "../landing/landing";
import { getLogin, PostLogin } from "./services/auth.services"
import { AlertError } from "../../shared/alert/error";

export const Login = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  

  // Función para recolección de datos
  const changeData = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  //
  const handleSubmit = async (e) => {
    e.preventDefault();
    await PostLogin(formData);
    const logiados = await getLogin()
    const Token = localStorage.getItem('Token');
    const user = logiados.find(e => e.email === formData.email)  
     console.log("informacion del usuario",user);
     
    const rolUser = user.roleId

    localStorage.setItem('rolId', JSON.stringify(rolUser));
    if (Token) {
      navigate("/dashboard", { replace: true });
    }
    else {
      AlertError('Error en las credenciales', 'El correo o la contraseña es invalida')
    }
  };
  return (
    <>
      <div className="container flex-grow-1 d-flex justify-content-center align-items-center pt-5 pb-4">
        <div
          className="row shadow rounded overflow-hidden"
          style={{ width: "900px", height: "500px" }}
        >
          {/* Imagen a la izquierda */}
          <div
            className="col-md-6 d-none d-md-block"
            style={{
              backgroundImage: `url("../../../public/img/inicio.jpg")`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>

          {/* Formulario de Login */}
          <div className="col-md-6 bg-white p-5">
            <h3 className="fw-bold">Inicio Sesión</h3>
            <p className="text-muted mb-4">
              ¡Bienvenido! Ingresa a tu cuenta.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Correo
                </label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  onChange={changeData}
                  value={formData.email}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Contraseña
                </label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  onChange={changeData}
                  value={formData.password}
                />
              </div>

              <p>¿No tienes una cuenta?<Link className="link-offset-2 link-underline link-underline-opacity-50" to="/Registrarse" ><br />¡Registrate acá!</Link></p>

              <button
                type="submit"
                className="btn btn-primary w-100 rounded-pill"
              >

                INICIAR SESIÓN
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
    
  );
};
