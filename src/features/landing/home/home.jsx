import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// iconos de React
import { MdOutlinePets } from "react-icons/md";
import { FaDog } from "react-icons/fa";
import { FaCat } from "react-icons/fa";
import { FaBone } from "react-icons/fa6";
import { getInfo } from "../services/services.service";

export const Home = () => {
  const [dataLandig, setDataLandig] = useState([]);
  useEffect(() => {
    const data = async () => {
      try {
        const response = await getInfo();
        setDataLandig(response.data);
      } catch (error) {
        console.error("Error al traer la información:", error);
      }
    };
    data();
  }, []);

  const navigate = useNavigate();

  const irAbout = () => {
    navigate("/Sobre-Nosotros");
  };

  const irLogin = () => {
    navigate("/login");
  };

  return (
    <>
      {dataLandig.map((e, i) => (
        <>
          <header className="d-flex align-items-center text-black py-7 min-vh-100 pt-5 bg-primary-subtle">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-12 col-md-6 text-center text-md-start">
                  <h1 className="header-tittle text-primary">
                    {e.tittleWelcom}
                  </h1>
                  <p className="fs-5">
                    {e.text1Welcom} 
                    <br />
                    <br />
                    {e.text2Welcom}
                  </p>
                  <div className="d-flex flex-column flex-md-row gap-3 justify-content-center justify-content-md-start mb-3">
                    <button
                      type="button"
                      className="btn btn-primary btn-lg"
                      onClick={irAbout}
                    >
                      ¡Conoce más!
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary btn-lg text-white"
                      onClick={irLogin}
                    >
                      Inicia Sesión
                    </button>
                  </div>
                </div>

                <div className="col-12 col-md-6 d-flex justify-content-center">
                  <img
                    src={e.imageLogoWelcom}
                    className="img-fluid w-75"
                    alt="Logo Caninos SABS"
                  />
                </div>
              </div>
            </div>
          </header>
          <section className="py-5">
            <div className="container">
              <h1 className="title text-center text-primary mb-5">
                {e.tittleOffer}
              </h1>
              <div className="row text-center">
                <div className="col-lg-3 col-sm-6 my-2">
                  <div className="card card-service bg-info py-4">
                    <div className="card-body">
                      <i className="display-5 text-white">
                        <FaDog />
                      </i>
                      <h5 className="card-title mt-3 text-white">
                        {e.tittleOfferCard1}
                      </h5>
                      <p className="card-text">
                        {e.textOfferCard1}
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
                      <h5 className="card-title mt-3 text-white">{e.tittleOfferCard2}</h5>
                      <p className="card-text">
                       {e.textOfferCard2}
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
                        {e.tittleOfferCard3}
                      </h5>
                      <p className="card-text">
                        {e.textOfferCard3}
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
                        {e.tittleOfferCard4}
                      </h5>
                      <p className="card-text">
                        {e.textOfferCard4}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      ))}
    </>
  );
};
