import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

export const Layout = () => {
  const navegation = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("Token");
    navegation('/');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      {/* Navbar superior */}
      <div className="bg-light p-3 d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between gap-2 border-bottom">
        <div className="d-flex align-items-center gap-2">
          <button className="btn btn-outline-primary d-md-none" onClick={toggleSidebar}>
            ☰
          </button>
          <img
            src="/img/Logo.png"
            className="rounded d-block"
            alt="Logo Caninos"
            style={{ width: "60px", height: "auto" }}
          />
          <p className="h5 fw-semibold m-0">Bienvenido</p>
        </div>
        <button onClick={logout} className="btn btn-danger">
          Salir
        </button>
      </div>


      <div className="d-flex flex-grow-1 flex-column flex-md-row">
        {/* Sidebar */}
        <nav
          className={`bg-primary text-white p-3 flex-column ${isSidebarOpen ? 'd-flex' : 'd-none'
            } d-md-flex`}
          style={{ width: "220px" }}
        >
          <ul className="nav flex-column">
            <li className="nav-item">
              <Link to="/dashboard/Usuarios" className="nav-link text-white">Usuarios</Link>
            </li>
            <li className="nav-item">
              <Link to="/dashboard/Roles" className="nav-link text-white">Roles</Link>
            </li>
            <li className="nav-item">
              <Link to="/dashboard/Compañias" className="nav-link text-white">Compañías</Link>
            </li>
            <li className="nav-item">
              <Link to="/dashboard/Productos" className="nav-link text-white">Productos</Link>
            </li>
            <li className="nav-item">
              <Link to="/dashboard/Categorias" className="nav-link text-white">Categorías</Link>
            </li>
            <li className="nav-item">
              <Link to="/dashboard/Servicios" className="nav-link text-white">Servicios</Link>
            </li>
          </ul>
        </nav>

        {/* Contenido */}
        <div className="flex-grow-1 p-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
