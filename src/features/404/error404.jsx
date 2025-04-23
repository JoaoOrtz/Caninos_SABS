import React from "react";

export const Error404 = () => {
  return (
    <>
    <div className="container text-center mt-5">
      <h1 className="display-4 text-primary">¡Pagina no encontrada!</h1>
      <img
        src="../../../../public/img/Error404 (2).png"
        alt="Pagina no encontrada"
        className="img-fluid mt-4"
        style={{ maxWidth: '300px' }}
      />
    </div>
    </>
  );
};
