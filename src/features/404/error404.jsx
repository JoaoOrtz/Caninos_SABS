import React from "react";

export const Error404 = () => {
  return (
    <>
      <div className="container-fluid d-flex flex-column align-items-center justify-content-center vh-100 bg-light">
        <h1 className="display-4 text-primary mb-4">¡Página no encontrada!</h1>
        <img
          src="../../../../public/img/Error404 (3).png"
          alt="Página no encontrada"
          className="img-fluid rounded"
          style={{
            maxHeight: "80vh",
            objectFit: "cover",
            borderRadius: "20px",
          }}
        />
      </div>
    </>
  );
};
