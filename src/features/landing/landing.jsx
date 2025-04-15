import React from 'react'
import { Link, Outlet } from 'react-router-dom'

export const Landing = () => {
  return (
    <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
        <div className="container-fluid">
            <a className="navbar-brand" href="#">Caninos SABS</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item"><Link className="nav-link active" to="#">Home</Link></li>
                    <li className="nav-item"><Link className="nav-link active" to="/landing/about">About Us</Link></li>
                    <li className="nav-item"><Link className="nav-link active" to="#">Products</Link></li>
                    <li className="nav-item"><Link className="nav-link active" to="#">Services</Link></li>
                    <li className="nav-item"><Link className="nav-link active" to="#">Categories</Link></li>
                </ul>
            </div>
        </div>
    </nav>

    <Outlet />
    </>
  )
}
