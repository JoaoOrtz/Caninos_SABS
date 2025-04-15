import React from 'react'

export const Home = () => {
  return (
    <>    
    <header className="d-flex align-items-center text-black py-7 min-vh-100 pt-5">
    <div className="container">
        <div className="row align-items-center">
            <div className="col-12 col-md-6 text-center text-md-start">
                <h1 className="header-tittle text-info">Bienvenido a <span className="text-primary">Caninos SABS</span></h1>
                <p>Caninos SABS es una empresa colombiana dedicada al cuidado integral de los animales de compañía. Combinamos tecnología, amor por las mascotas y un enfoque profesional para ofrecer productos innovadores, servicios veterinarios especializados y atención personalizada. Nuestra plataforma te permite descubrir nuestros servicios, explorar productos de alta calidad y conocer todo lo que hacemos para mejorar la vida de tu mejor amigo peludo. En Caninos SABS, tu mascota es parte de nuestra familia. 🐶🐾</p>
                
                <div className="d-flex flex-column flex-md-row gap-3 justify-content-center justify-content-md-start mb-3">
                    <button type="button" className="btn btn-primary">¡Conoce más!</button>
                    <button type="button" className="btn btn-info">Inicia Sesión</button>
                </div>
            </div>

            <div className="col-12 col-md-6 d-flex justify-content-center">
                <img src="../../../public/img/logo.png" className="img-fluid w-75" alt="Logo Caninos SABS"/>
            </div>
        </div>
      </div>
  </header>
</>
  )
}
