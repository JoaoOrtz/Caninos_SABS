import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { getRole } from "../dashboard/layout.service";

// icon react
import { IoPerson } from "react-icons/io5";

export const Landing = () => {
  return (
    <>
    <div className="d-flex flex-column min-vh-100">
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
                  Inicio
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/Sobre-Nosotros">
                  ¿Quiénes Somos?
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/productos">
                  Nuestros Productos
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/Compañias">
                  Nuestros Aliados
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/Categorias">
                  Nuestras Categorías
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/login" >
                  <button
                    className="btn btn-info text-white"
                    type="button"
                  >
                    <IoPerson />
                  </button>
                </Link>
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
      </div>
    </>
  );
};
