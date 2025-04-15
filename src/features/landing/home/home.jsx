import React from "react";
import { useNavigate } from "react-router-dom";

// iconos de React
import { MdOutlinePets } from "react-icons/md";
import { FaDog } from "react-icons/fa";
import { FaCat } from "react-icons/fa";
import { FaBone } from "react-icons/fa6";

export const Home = () => {

  const navigate = useNavigate()

  const irAbout = () => {
    navigate("/Sobre-Nosotros")
  }

  const irLogin = () => {
    navigate("/login")
  }

  return (
    <>
      {/* Home descripción */}
      <header className="d-flex align-items-center text-black py-7 min-vh-100 pt-5 bg-primary-subtle">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12 col-md-6 text-center text-md-start">
              <h1 className="header-tittle text-primary">
                Bienvenido a Caninos SABS
              </h1>
              <p className="fs-5">
                Caninos SABS es una empresa colombiana dedicada al cuidado
                integral de los animales de compañía. Combinamos tecnología,
                amor por las mascotas y un enfoque profesional para ofrecer
                productos innovadores, servicios veterinarios especializados y
                atención personalizada. <br /> Nuestra plataforma te permite descubrir
                nuestros servicios, explorar productos de alta calidad y conocer
                todo lo que hacemos para mejorar la vida de tu mejor amigo
                peludo. En Caninos SABS, tu mascota es parte de nuestra familia.
                🐶🐾
              </p>

              <div className="d-flex flex-column flex-md-row gap-3 justify-content-center justify-content-md-start mb-3">
                <button type="button" className="btn btn-primary btn-lg" onClick={irAbout}>
                  ¡Conoce más!
                </button>
                <button type="button" className="btn btn-primary btn-lg text-white" onClick={irLogin}>
                  Inicia Sesión
                </button>
              </div>
            </div>

            <div className="col-12 col-md-6 d-flex justify-content-center">
              <img
                src="../../../public/img/logo.png"
                className="img-fluid w-75"
                alt="Logo Caninos SABS"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Cards */}
      <section className="py-5">
        <div className="container">
          <h1 className="title text-center text-primary mb-5">
            ¿Qué ofrecemos?
          </h1>
          <div className="row text-center">
            <div className="col-lg-3 col-sm-6 my-2">
              <div className="card card-service bg-info py-4">
                <div className="card-body">
                  <i className="display-5 text-white">
                    <FaDog />
                  </i>
                  <h5 className="card-title mt-3 text-white">
                    Consulta Veterinaria
                  </h5>
                  <p className="card-text">
                    Nuestro servicio de consulta veterinaria está enfocado en el
                    cuidado integral y preventivo de tu mascota. Contamos con
                    profesionales capacitados.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-sm-6 my-2">
              <div className="card card-service bg-info py-4">
                <div className="card-body">
                  <i className="display-5 text-white">
                    <MdOutlinePets />
                  </i>
                  <h5 className="card-title mt-3 text-white">Accesorios</h5>
                  <p className="card-text">
                    Contamos con una amplia variedad de accesorios diseñados
                    para brindar comodidad, estilo y funcionalidad.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-sm-6 my-2">
              <div className="card card-service bg-info py-4">
                <div className="card-body">
                  <i className="display-5 text-white">
                    <FaCat />
                  </i>
                  <h5 className="card-title mt-3 text-white">
                    Spa y peluquería
                  </h5>
                  <p className="card-text">
                    Sabemos que tu mascota merece lo mejor, por eso ofrecemos un
                    servicio de peluquería y spa pensado para consentirla al
                    máximo.{" "}
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-3 col-sm-6 my-2">
              <div className="card card-service bg-info py-4">
                <div className="card-body">
                  <i className="display-5 text-white">
                    <FaBone />
                  </i>
                  <h5 className="card-title mt-3 text-white">
                    Alimentos balanceados
                  </h5>
                  <p className="card-text">
                    Ofrecemos una línea completa de alimentos balanceados para
                    cubrir las necesidades nutricionales de tus mascotas en cada
                    etapa de su vida.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


    </>
  );
};
