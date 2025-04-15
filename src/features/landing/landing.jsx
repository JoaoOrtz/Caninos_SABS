import React from "react";
import { Link, Outlet } from "react-router-dom";

// icon react
import { IoPerson } from "react-icons/io5";

export const Landing = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Caninos SABS
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto align-items-center">
              <li className="nav-item">
                <Link className="nav-link active" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/Sobre-Nosotros">
                  About Us
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/productos">
                  Products
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/Servicios">
                  Services
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/Categorias">
                  Categories
                </Link>
              </li>

              {/* Dropdown */}
              <li className="nav-item dropdown ">
                <button
                  className="btn btn-info dropdown-toggle text-white"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <IoPerson />
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <Link className="dropdown-item" to="/login" >
                      Inicia Sesión
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/Registrarse" >
                      Registrate
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <Outlet />

      {/* footer */}
      <footer className="bg-primary text-white text-center py-3 mt-auto">
        <div className="container">
          <p className="mb-0">
            &copy; {new Date().getFullYear()} Caninos SABS. Todos los derechos
            reservados.
          </p>
        </div>
      </footer>
    </>
  );
};
