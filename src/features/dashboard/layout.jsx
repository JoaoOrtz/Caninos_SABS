import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export const Layout = () => {
  return (
    <>
      <div className="d-flex min-vh-100">
        {/* Sidebar */}
        <nav className="bg-primary text-white w-23 p-3 d-flex flex-column">
          {/* Enlaces */}
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link to="/dashboard/Usuarios" className="nav-link text-white py-2 px-3 hover-bg-primary rounded">Usuarios</Link>
            </li>
            <li className="nav-item">
              <Link to="/dashboard/Roles" className="nav-link text-white py-2 px-3 hover-bg-primary rounded">Roles</Link>
            </li>
            <li className="nav-item">
              <Link to="/dashboard/Compañias" className="nav-link text-white py-2 px-3 hover-bg-primary rounded">Compañias</Link>
            </li>
            <li className="nav-item">
              <Link to="/dashboard/Productos" className="nav-link text-white py-2 px-3 hover-bg-primary rounded">Productos</Link>
            </li>
            <li className="nav-item">
              <Link to="/dashboard/Categorias" className="nav-link text-white py-2 px-3 hover-bg-primary rounded">Categorias</Link>
            </li>
            <li className="nav-item">
              <Link to="/dashboard/Servicios" className="nav-link text-white py-2 px-3 hover-bg-primary rounded">Servicios</Link>
            </li>
          </ul>
        </nav>

        {/* Contenido principal */}
        <div className="flex-grow-1 d-flex flex-column">
          {/* Navbar superior */}
          <div className="bg-light p-3 d-flex justify-content-between align-items-center">
            <p className="h5 fw-semibold m-0">Bienvenido</p>
            <button className="btn btn-danger">
              Salir
            </button>
          </div>

          {/* Contenido iterativo (Outlet) */}
          <div className="p-4 flex-grow-1">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  )
}
