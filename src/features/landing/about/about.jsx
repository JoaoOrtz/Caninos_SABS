import React from 'react'
import { useNavigate } from 'react-router-dom'

export const About = () => {

  const navigate = useNavigate()

  const irRegistro = () => {
    navigate('/Registrarse')
  }


  return (
    <>
      <section className='py-5 mt-3'>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <img src="../../../public/img/espacioVeterinaria.jpg" className='mg-fluid w-100 rounded shadow-sm'/>
            </div>
            <div className="col-md-6 p-4">
              <h1 className='title text-primary'>¡Sobre Nosotros!</h1>
              <p>Caninos SABS es una empresa colombiana fundada en 2015, especializada en el desarrollo, comercialización y distribución de productos y servicios para el cuidado integral de mascotas. <br /><br /> Nuestro objetivo es mejorar la calidad de vida de los animales de compañía y facilitar a sus dueños el acceso a soluciones innovadoras y confiables. <br /> <br /> Caninos SABS tiene su sede principal en Medellín, Antioquia, con cobertura de servicios a nivel nacional y planes de expansión a otros países de Latinoamérica.</p>

              <div className="row text-center my-3 ">

                <div className="col-sm-4 my-1">
                  <div className="card py-4 bg-primary text-white">
                    <h3>+500</h3>
                    <p>Clientes<br />Satisfechos</p>
                  </div>
                </div>


                <div className="col-sm-4 my-1 ">
                  <div className="card py-4 bg-primary text-white">
                    <h3>+10</h3>
                    <p>Años de<br />Experiencia</p>
                  </div>
                </div>


                <div className="col-sm-4 my-1 ">
                  <div className="card py-4 bg-primary text-white">
                    <h3>+2000</h3>
                    <p>Mascotas<br />Beneficiadas</p>
                  </div>
                </div>
              </div>

            <button className="btn btn-primary btn-lg btn-about" onClick={irRegistro}>
              ¡Registrate!
            </button>

            </div>
          </div>
        </div>
      </section>


      {/* Misión, Visión y objetivo */}

      <div className="bg-primary-subtle py-5">
        <div className="container">
          <h1 className="title text-center text-primary">Misión, Visión y Objetivo</h1>
          <div className="row text-center">

            <div className="col-lg-4 col-sm-6 my-2">
              <div className="card portfolio-card">
                <img src="../../../public/img/card1.jpg" className='img-fluid w-100'/>
                <div className="portfolio-description">
                  <h5 className='card-title mt-3'>Misión</h5>
                  <p>Brindar soluciones integrales y de alta calidad para el bienestar de las mascotas, mediante la comercialización de productos innovadores y la prestación de servicios veterinarios especializados, promoviendo el cuidado responsable.</p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-sm-6 my-2">
              <div className="card portfolio-card">
                <img src="../../../public/img/card2.jpg" className='img-fluid w-100'/>
                <div className="portfolio-description">
                  <h5 className='card-title mt-3'>Visión</h5>
                  <p>Ser la empresa líder en Colombia y referente en Latinoamérica en el sector de cuidado animal, reconocida por su compromiso con la salud, el bienestar y la felicidad de las mascotas, mediante el uso de tecnología, innovación y un enfoque humano y ético.</p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-sm-6 my-2">
              <div className="card portfolio-card">
                <img src="../../../public/img/card3.jpg" className='img-fluid w-100'/>
                <div className="portfolio-description">
                  <h5 className='card-title mt-3'>Objetivo</h5>
                  <p>Consolidarnos como una plataforma integral que facilite la gestión y acceso a productos y servicios de alta calidad para el bienestar animal, mediante el uso de tecnología, innovación y un enfoque centrado en la satisfacción de nuestros clientes y el cuidado responsable de las mascotas.</p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

    </>
    
  )
}
