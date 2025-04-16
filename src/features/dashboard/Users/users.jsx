import React from 'react'

export const UserDashboard = () => {
  return (
    <>
    <h2>Lista De Usuarios</h2>
    <div className='card'>
    <table class="table">
      <thead>
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
      </tbody>
    </table>
    </div>
  </>
  )
}
