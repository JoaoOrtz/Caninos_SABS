import React from "react";

export const ProductDashboard = () => {
  return (
    <>
      <h2>Lista De Productos</h2>
      <div className="card">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre</th>
              <th scope="col">Descripcion</th>
              <th scope="col">Precio</th>
              <th scope="col">Cantidad</th>
              <th scope="col">Imagen</th>
              <th scope="col">Categoria</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </>
  );
};
