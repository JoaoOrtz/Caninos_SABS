
import React, { useState } from 'react'
import { Landing } from '../landing/landing'

export const Record = () => {
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [nombre, setNombre] = useState("")
  const [error, setError] = useState("")
  const [usuarios, setUsuarios] = useState(() => JSON.parse(localStorage.getItem("Usuarios")) || [])


  const guardar = (e) => {
    e.preventDefault()
    if (!validacionExistente) {
      return
    }
    InsertData({ password, email, nombre })

    setEmail("")
    setNombre("")
    setPassword("")
  }

  const validacionExistente = () => {
    const existeEmail = usuarios.some((e) => email === e.email);
    if (existeEmail) {
      setError("No se puede el mismo email");
      return false;
    } else {
      setError("");
      return true;
    }
  };

  const InsertData = (data) => {
    const newUsuario = [...usuarios, data]
    setUsuarios(newUsuario)
    localStorage.setItem("Usuarios", JSON.stringify(newUsuario))
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
              backgroundImage: `url("../../../public/img/registro.jpg")`,
              backgroundRepeat: 'no-repeat',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          ></div>

          {/* Formulario a la derecha */}
          <div className="col-md-6 bg-white p-5">
            <h3 className="fw-bold">SIGN UP</h3>
            <p className="text-muted mb-4">Sign up today to help dogs in your area.</p>

            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            <form onSubmit={guardar}>
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label">
                  Nombre
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="nombre"
                  onChange={(e) => setNombre(e.target.value)}
                  value={nombre}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Correo
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  onBlur={validacionExistente}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Contraseña
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  onBlur={validacionExistente}
                />
              </div>
              <div className="form-check mb-3">
                <input className="form-check-input" type="checkbox" id="newsletter" />
                <label className="form-check-label" htmlFor="newsletter">
                  Subscribe me to the newsletter
                </label>
              </div>
              <button type="submit" className="btn btn-primary w-100 rounded-pill">
                SIGN UP NOW
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
