import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getInfo } from "../services/services.service";

export const About = () => {
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

  const irRegistro = () => {
    navigate("/login");
  };

  return (
    <>
      {dataLandig.map((e) => (
        <>
          <section className="py-5 mt-3">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-md-6">
                  <img
                    src={e.imageAbout}
                    className="mg-fluid w-100 rounded shadow-sm"
                  />
                </div>
                <div className="col-md-6 p-4">
                  <h1 className="title text-primary">{e.tittleAbout}</h1>
                  <p>
                    {e.text1About}
                    <br />
                    <br /> 
                    {e.text2About}
                    <br />
                    <br />
                    {e.text3About}
                  </p>

                  <div className="row text-center my-3 ">
                    <div className="col-sm-4 my-1">
                      <div className="card py-4 bg-primary text-white">
                        <h3>{e.tittleAboutcard1}</h3>
                        <p>
                          {e.text1Aboutcard1}
                          <br />
                          {e.text2Aboutcard1}
                        </p>
                      </div>
                    </div>

                    <div className="col-sm-4 my-1 ">
                      <div className="card py-4 bg-primary text-white">
                        <h3>{e.tittleAboutcard2}</h3>
                        <p>
                        {e.text1Aboutcard2}
                          <br />
                          {e.text2Aboutcard2}
                        </p>
                      </div>
                    </div>

                    <div className="col-sm-4 my-1 ">
                      <div className="card py-4 bg-primary text-white">
                        <h3>{e.tittleAboutcard3}</h3>
                        <p>
                        {e.text1Aboutcard3}
                          <br />
                          {e.text2Aboutcard3}
                        </p>
                      </div>
                    </div>
                  </div>

                  <button
                    className="btn btn-primary btn-lg btn-about"
                    onClick={irRegistro}
                  >
                    ¡Inicia Sesión!
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Misión, Visión y objetivo */}

          <div className="bg-primary-subtle py-5">
            <div className="container">
              <h1 className="title text-center text-primary">
                {e.tittleMVO}
              </h1>
              <div className="row text-center">
                <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                  <div className="card portfolio-card shadow-lg p-3 rounded">
                    <img
                      src={e.imageMVOCard1}
                      className="img-fluid w-100"
                    />
                    <div className="portfolio-description">
                      <h5 className="card-title mt-3">{e.tittleMVOCard1}</h5>
                      <p>
                      {e.textMVOCard1}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                  <div className="card portfolio-card shadow-lg p-3 rounded">
                    <img
                      src={e.imageMVOCard2}
                      className="img-fluid w-100"
                    />
                    <div className="portfolio-description">
                      <h5 className="card-title mt-3">{e.tittleMVOCard2}</h5>
                      <p>
                        {e.textMVOCard2}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                  <div className="card portfolio-card shadow-lg p-3 rounded">
                    <img
                      src={e.imageMVOCard3}
                      className="img-fluid w-100"
                    />
                    <div className="portfolio-description">
                      <h5 className="card-title mt-3">{e.tittleMVOCard3}</h5>
                      <p>
                      {e.textMVOCard3}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ))}
    </>
  );
};
