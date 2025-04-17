import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts } from "./service/product.service";
import { MdDelete } from "react-icons/md";
import { RiEditBoxLine } from "react-icons/ri";
import { AlertDelete } from "./components/delete/delete";
import { SeeProduct } from "./components/see/see.product";

export const ProductDashboard = () => {
  const navegation = useNavigate()
  const [dataProducts, setDataProducts] = useState([])

  useEffect(() => {
    const data = async () => {
      const response = await getProducts()
      setDataProducts(response.data.products)
    }
    data()
  }, [dataProducts])

  const viewForm = () =>{
    navegation('/dashboard/nuevo-producto')
  }

  const viewUpdate = (id) =>{
    navegation('/dashboard/editar-producto/'+id)
  }

  return (
    <>
      <div className="row g-3 p-2 align-items-center">
        <div className="col-auto">
        <h2>Lista De Productos</h2>
        </div>
        <div className="col-auto ms-auto">
          <button type="button" className="btn btn-primary" onClick={viewForm}>Nuevo producto</button>
        </div>
      </div>
      <div className="card">
        <table className="table">
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
          <tbody>
            {dataProducts.map((e, i) => (
              <tr key={i}>
                <td>{e.id}</td>
                <td>{e.name}</td>
                <td>{e.description}</td>
                <td>{e.price}</td>
                <td>{e.stock}</td>
                <td>
                  {e.urlImage ? (<img src={e.urlImage} alt={`Imagen de ${e.nombre}`} style={{ width: "50px", height: "auto" }} />) : (<span>No hay imagen</span>)}
                </td>
                <td>{e.category.name}</td>
                <td>
                  <div className="btn-group" role="group" aria-label="Basic mixed styles example">
                    <button type="button" className="btn btn-danger" onClick={() => AlertDelete(e.id, "¿De seguro quieres eliminar el producto?", `El producto que quieres eliminar es ${e.name}`)}><MdDelete /></button>
                    <SeeProduct id={e.id} />
                    <button type="button" className="btn btn-success" onClick={()=> viewUpdate(e.id)}><RiEditBoxLine /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
