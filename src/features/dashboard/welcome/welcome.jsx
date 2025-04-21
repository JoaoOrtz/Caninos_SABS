import React from "react";

export const Welcome = () => {
  return (
    <>
    <div className="container text-center mt-5">
      <h1 className="display-4 text-primary">¡Bienvenido a tu perfil!</h1>
      <p className="lead mt-3">
        Aquí puedes revisar y actualizar tu información personal, gestionar tus productos y más.
      </p>
      <img
        src="../../../../public/img/icon2.png"
        alt="Perfil amigable"
        className="img-fluid mt-4"
        style={{ maxWidth: '300px' }}
      />
    </div>
    </>
  );
};
