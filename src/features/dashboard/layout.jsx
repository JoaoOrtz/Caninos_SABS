import React, { useEffect, useState, useMemo } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { getRole } from "./layout.service";
import { getUsers } from "./Users/services/users.service";

// Icon

import { TiThMenu } from "react-icons/ti";
import { TbLogout } from "react-icons/tb";

export const Layout = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [userRol, setUserRol] = useState(null);
  const [invalidRole, setInvalidRole] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState();

  const logout = () => {
    localStorage.removeItem("Token");
    localStorage.removeItem("rolId");
    localStorage.removeItem("User");
    navigate("/");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const closeSidebarOnMobile = () => {
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  const normalizeRoleName = (name) => {
    if (!name) return "";
    const lowerName = name.toLowerCase().trim();

    if (lowerName.includes("admin")) return "administrador";
    if (lowerName.includes("administradora")) return "administrador";
    if (lowerName.includes("superadmin")) return "administrador";
    if (lowerName.includes("superadministrador")) return "administrador";
    if (lowerName.includes("superadmintradora")) return "administrador";
    if (lowerName.includes("gerente")) return "administrador";
    if (lowerName.includes("director")) return "administrador";

    if (lowerName.includes("empresa")) return "proveedor";
    if (lowerName.includes("proveedora")) return "proveedor";
    if (lowerName.includes("abastecedor")) return "proveedor";
    if (lowerName.includes("abastecedora")) return "proveedor";
    if (lowerName.includes("provisor")) return "proveedor";
    if (lowerName.includes("provisora")) return "proveedor";
    if (lowerName.includes("suministrador")) return "proveedor";
    if (lowerName.includes("suministradora")) return "proveedor";
    if (lowerName.includes("distribuidor")) return "proveedor";
    if (lowerName.includes("distribuidora")) return "proveedor";
    if (lowerName.includes("agente")) return "proveedor";

    return lowerName;
  };

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        setLoading(true);
        setInvalidRole(false);

        const rolId = localStorage.getItem("rolId");
        const userR = JSON.parse(localStorage.getItem("User"));

        setUserName(userR?.fullName);

        if (!rolId) {
          setInvalidRole(true);
          return;
        }

        const response = await getRole(parseInt(rolId));
        setUserRol(response.data);

        const res2 = await getUsers();

        const admin = res2.data.find(
          (e) => normalizeRoleName(e.role?.name) === "administrador"
        );

        if (admin) {
          setUser(admin);
        }

        const normalizedRole = normalizeRoleName(response.data.name);
        if (
          !["administrador", "proveedor", "usuario"].includes(normalizedRole)
        ) {
          setInvalidRole(true);
        }
      } catch (error) {
        setInvalidRole(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();

    // Cerrar sidebar al cambiar el tamaño de la pantalla
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    // Establecer estado inicial basado en el tamaño de la pantalla
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navLinks = useMemo(() => {
    if (!userRol || invalidRole) return [];

    const normalizedRole = normalizeRoleName(userRol.name);
    const userR = JSON.parse(localStorage.getItem("User"));

    const roleLinks = {
      administrador: [
        <li key="roles" className="nav-item" onClick={closeSidebarOnMobile}>
          <Link to="/dashboard/Roles" className="nav-link text-white">
            <i className="bi bi-person-badge me-2"></i>Roles
          </Link>
        </li>,
        <li key="compañias" className="nav-item" onClick={closeSidebarOnMobile}>
          <Link to="/dashboard/Compañias" className="nav-link text-white">
            <i className="bi bi-building me-2"></i>Compañías
          </Link>
        </li>,
        <li key="usuarios" className="nav-item" onClick={closeSidebarOnMobile}>
          <Link to="/dashboard/Usuarios" className="nav-link text-white">
            <i className="bi bi-people me-2"></i>Usuarios
          </Link>
        </li>,
        <li
          key="categorias"
          className="nav-item"
          onClick={closeSidebarOnMobile}
        >
          <Link to="/dashboard/Categorias" className="nav-link text-white">
            <i className="bi bi-tags me-2"></i>Categorías
          </Link>
        </li>,
        <li key="productos" className="nav-item" onClick={closeSidebarOnMobile}>
          <Link to="/dashboard/Productos" className="nav-link text-white">
            <i className="bi bi-box-seam me-2"></i>Productos
          </Link>
        </li>,
        <li
          key="informacion"
          className="nav-item"
          onClick={closeSidebarOnMobile}
        >
          <Link to="/dashboard/Informacion" className="nav-link text-white">
            <i className="bi bi-info-circle me-2"></i>Información Landing
          </Link>
        </li>,
        <li key="usuario" className="nav-item" onClick={closeSidebarOnMobile}>
          <Link
            to={`/dashboard/Usuario/${userR.id}`}
            className="nav-link text-white"
          >
            <i className="bi bi-person me-2"></i>Mi Perfil
          </Link>
        </li>,
      ],
      proveedor: [
        <li key="perfil" className="nav-item" onClick={closeSidebarOnMobile}>
          <Link
            to={`/dashboard/Usuario/${userR.id}`}
            className="nav-link text-white"
          >
            <i className="bi bi-person me-2"></i>Mi Perfil
          </Link>
        </li>,
        <li
          key="categorias"
          className="nav-item"
          onClick={closeSidebarOnMobile}
        >
          <Link to="/dashboard/Categorias" className="nav-link text-white">
            <i className="bi bi-tags me-2"></i>Categorías
          </Link>
        </li>,
        <li key="productos" className="nav-item" onClick={closeSidebarOnMobile}>
          <Link to="/dashboard/Productos" className="nav-link text-white">
            <i className="bi bi-box-seam me-2"></i>Productos
          </Link>
        </li>,
      ],
      usuario: [
        <li key="perfil" className="nav-item" onClick={closeSidebarOnMobile}>
          <Link
            to={`/dashboard/Usuario/${userR.id}`}
            className="nav-link text-white"
          >
            <i className="bi bi-person me-2"></i>Mi Perfil
          </Link>
        </li>,
      ],
    };

    return roleLinks[normalizedRole] || [];
  }, [userRol, invalidRole]);

  return (
    <div className="min-vh-100 d-flex flex-column">
      <div
        className="bg-light p-3 d-flex flex-column flex-sm-row align-items-start align-items-sm-center justify-content-between gap-2 border-bottom sticky-top"
        style={{ zIndex: 1020 }}
      >
        <div className="d-flex align-items-center gap-2">
          <button
            className="btn btn-outline-primary d-md-none"
            onClick={toggleSidebar}
          >
            {isSidebarOpen ? (
              <i className="bi bi-x-lg"><TiThMenu /></i>
            ) : (
              <i className="bi bi-list"><TiThMenu /></i>
            )}
          </button>
          <p className="h5 fw-semibold m-0">
            Bienvenido{" "}
            {JSON.parse(localStorage.getItem("User"))?.fullName || "Usuario"}
          </p>
        </div>
        <button onClick={logout} className="btn btn-danger">
          <i className="bi bi-box-arrow-right me-1"></i><TbLogout />
        </button>
      </div>

      <div className="d-flex flex-grow-1 flex-column flex-md-row">
        {/* Overlay para móvil */}
        {isSidebarOpen && (
          <div
            className="d-md-none position-fixed top-0 start-0 w-100 h-100 bg-dark opacity-50"
            style={{ zIndex: 1000 }}
            onClick={toggleSidebar}
          ></div>
        )}

        {/* Sidebar */}
        <nav
          className={`bg-primary text-white p-3 flex-column ${
            isSidebarOpen ? "d-flex" : "d-none"
          } d-md-flex position-md-relative`}
          style={{
            width: "220px",
            zIndex: 1001,
            position: isSidebarOpen ? "fixed" : "relative",
            height: isSidebarOpen ? "100vh" : "auto",
            transition: "transform 0.3s ease-in-out",
            transform: isSidebarOpen ? "translateX(0)" : "translateX(-100%)",
          }}
        >
          <ul className="nav flex-column gap-2">
            {!loading && navLinks}
            {loading && <li className="nav-item text-white">Cargando...</li>}
          </ul>
        </nav>

        {/* Contenido principal */}
        <div
          className={`flex-grow-1 p-3 ${
            isSidebarOpen ? "overflow-hidden" : ""
          }`}
          style={{
            marginLeft: isSidebarOpen ? "220px" : "0",
            transition: "margin-left 0.3s ease-in-out",
          }}
        >
          <Outlet />
          {!loading && invalidRole && (
            <div className="alert alert-warning mt-3" role="alert">
              Rol no reconocido. Por favor, comuníquese con el administrador{" "}
              {user?.email || "desconocido"} para asignarle un rol válido.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
