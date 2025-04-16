import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Landing } from '../landing/landing'

export const Login = () => {
  const navegacion = useNavigate()
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("") 
  const getUsuarios = JSON.parse(localStorage.getItem("Usuarios"))
  const validar = (e) =>{
    e.preventDefault()

    const encontrado = getUsuarios.find((e) => email === e.email && password === e.password)
    if (encontrado) {
      navegacion("/dashboard/inicio")
    }else{
      alert("No esta registrado")
    }
  }
  return (
    <>
    <Landing />

    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-light">
      <div className="row shadow rounded overflow-hidden" style={{ width: '900px', height: '500px' }}>
        
        {/* Imagen a la izquierda */}
        <div
          className="col-md-6 d-none d-md-block"
          style={{
            backgroundImage: `url("../../../public/img/inicio.jpg")`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>

        {/* Formulario de Login */}
        <div className="col-md-6 bg-white p-5">
          <h3 className="fw-bold">LOGIN</h3>
          <p className="text-muted mb-4">Welcome back! Please login to your account.</p>

          <form onSubmit={validar}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Correo</label>
              <input
                type="email"
                className="form-control"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="password" className="form-label">Contraseña</label>
              <input
                type="password"
                className="form-control"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>

            <button type="submit" className="btn btn-primary w-100 rounded-pill">
              INICIAR SESIÓN
            </button>
          </form>
        </div>
      </div>
    </div>
    </>
  )
}


