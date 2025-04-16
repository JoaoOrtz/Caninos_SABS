import React from "react";

export const CategoryDashboard = () => {
  return (
    <>
      <h2>Lista De Categorias</h2>
      <div className="card">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Nombre</th>
              <th scope="col">Descripcion</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody></tbody>
        </table>
      </div>
    </>
  );
};
