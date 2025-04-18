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
              <p>Caninos SABS es una empresa colombiana fundada en 2015, especializada en el desarrollo, comercialización y distribución de productos para el cuidado integral de mascotas. <br /><br /> Nuestro objetivo es mejorar la calidad de vida de los animales de compañía y facilitar a sus dueños el acceso a soluciones innovadoras, confiables y de alta calidad, en alianza con empresas comprometidas con el bienestar animal. <br /><br /> Caninos SABS tiene su sede principal en Medellín, Antioquia, con cobertura nacional y planes de expansión hacia otros países de Latinoamérica.</p>

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
              
              <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                <div className="card portfolio-card shadow-lg p-3 rounded">
                  <img src="../../../public/img/card1.jpg" className='img-fluid w-100'/>
                  <div className="portfolio-description">
                    <h5 className='card-title mt-3'>Misión</h5>
                    <p>Brindar soluciones integrales y de alta calidad para el bienestar de las mascotas mediante la comercialización de productos innovadores, promoviendo el cuidado responsable. Nos esforzamos por ofrecer una experiencia confiable y tecnológica que facilite a las mascotas el acceso a lo mejor del mercado.</p>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                <div className="card portfolio-card shadow-lg p-3 rounded">
                  <img src="../../../public/img/card2.jpg" className='img-fluid w-100'/>
                  <div className="portfolio-description">
                    <h5 className='card-title mt-3'>Visión</h5>
                    <p>Ser la empresa líder en Colombia en el sector de productos para el cuidado animal, reconocida por su compromiso con la innovación, el bienestar de las mascotas y su enfoque ético. Aspiramos a transformar la forma en que los dueños de mascotas acceden a productos de calidad.</p>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 col-sm-12 mb-4">
                <div className="card portfolio-card shadow-lg p-3 rounded">
                  <img src="../../../public/img/card3.jpg" className='img-fluid w-100'/>
                  <div className="portfolio-description">
                    <h5 className='card-title mt-3'>Objetivo</h5>
                    <p>Consolidarnos como una plataforma integral que facilite el acceso a productos de alta calidad y promueva alianzas estratégicas con empresas del sector, a través del uso de tecnología y un enfoque centrado en la satisfacción de nuestros clientes y el bienestar animal.</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>


    </>
    
  )
}
