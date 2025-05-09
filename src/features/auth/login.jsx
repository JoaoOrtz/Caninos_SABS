import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
    
    try {
      const res = await PostLogin(formData);      
      
      // Si el servidor devuelve un token, el login fue exitoso
      if (res.data.token) {
        const logiados = await getLogin();    
        const user = logiados.find(e => e.email === formData.email);
        
        if (!user) {
          AlertError('Error', 'Usuario no encontrado');
          return; // Detener ejecución si no existe
        }
        
        const rolUser = user.roleId;
  
        localStorage.setItem('Token', res.data.token);
        localStorage.setItem('rolId', JSON.stringify(rolUser));
        localStorage.setItem('User', JSON.stringify(user));
        
        navigate("/dashboard", { replace: true });
      } else {
        // Si no hay token, mostrar error (usuario no existe o contraseña incorrecta)
        AlertError('Error en las credenciales', 'El correo o la contraseña es inválida');
      }
    } catch (error) {
      console.error("Error durante el login:", error);
      AlertError('Error', 'No se pudo conectar al servidor o el usuario no existe');
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
