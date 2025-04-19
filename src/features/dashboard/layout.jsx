import React, { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { getRole } from './layout.service';

export const Layout = () => {
  const navegation = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [userRol, setUserRol] = useState(null);

  const logout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("rolId");
    navegation('/');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const Data = async () => {
      const rolId = localStorage.getItem('rolId');
      const res = await getRole(parseInt(rolId))
      setUserRol(res.data)
    }
    Data()
  }, [])
  console.log(userRol);
  
  // Función para renderizar los enlaces según el rol
  const renderNavLinks = () => {
    if (!userRol) return null;

    const commonLinks = [
      <li key="productos" className="nav-item">
        <Link to="/dashboard/Productos" className="nav-link text-white">Productos</Link>
      </li>,
      <li key="categorias" className="nav-item">
        <Link to="/dashboard/Categorias" className="nav-link text-white">Categorías</Link>
      </li>
    ];

    if (userRol.name === 'Administrador') {
      return [
        <li key="usuarios" className="nav-item">
          <Link to="/dashboard/Usuarios" className="nav-link text-white">Usuarios</Link>
        </li>,
        <li key="roles" className="nav-item">
          <Link to="/dashboard/Roles" className="nav-link text-white">Roles</Link>
        </li>,
        <li key="compañias" className="nav-item">
          <Link to="/dashboard/Compañias" className="nav-link text-white">Compañías</Link>
        </li>,
        ...commonLinks
      ];
    } else if (userRol.name === 'proveedor') {
      return commonLinks;
    }

    return null;
  };

  return (
    <div className="min-vh-100 d-flex flex-column">
      {/* Navbar superior */}
      <div className="bg-light p-3 d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between gap-2 border-bottom">
        <div className="d-flex align-items-center gap-2">
          <button className="btn btn-outline-primary d-md-none" onClick={toggleSidebar}>
            ☰
          </button>
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
            {renderNavLinks()}
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