import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCategories, getProductbyCategoryID, getProducts } from "./service/product.service";
import { MdDelete } from "react-icons/md";
import { RiEditBoxLine } from "react-icons/ri";
import { AlertDelete } from "./components/delete/delete";
import { SeeProduct } from "./components/see/see.product";

export const ProductDashboard = () => {
  const navegation = useNavigate()
  const [dataProducts, setDataProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [category, setCategory] = useState([])
  const [categoryId, setCategoryId] = useState()

  //Trae los productos
  useEffect(() => {
    const data = async () => {
      const response = await getProducts()
      setDataProducts(response.data.products)
    }
    data()
  }, [])

  //Trae las categorias
  useEffect(() => {
    const data = async () => {
      const response = await getCategories()
      setCategories(response.data.categories)
    }
    data()
  }, [])

  //Trae una categoria
  useEffect(() => {
    const data = async () => {
      const response = await getProductbyCategoryID(categoryId)
      setCategory(response.data.products)
    }
    if (categoryId) data();
  }, [categoryId])

  const viewForm = () => {
    navegation('/dashboard/nuevo-producto')
  }

  const viewUpdate = (id) => {
    navegation('/dashboard/editar-producto/' + id)
  }

  return (
    <>
      <div className="container-fluid">
        <div className="row g-3 p-2 align-items-center">
          <div className="col">
            <h2>Lista De Productos</h2>
          </div>
          <div className="col-auto ms-auto">
            <button type="button" className="btn btn-primary" onClick={viewForm}>Nuevo producto</button>
          </div>
        </div>

        <div className="row g-2 p-2">
          <div className="col-md-4 col-sm-12">
            <select
              className="form-select shadow-sm"
              style={{ borderRadius: "8px" }}
              aria-label="Filtrar por categoría"
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option key={0} value={0}>Todas las categorías</option>
              {categories.map((e) => (
                <option key={e.id} value={e.id}>{e.name}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-hover align-middle shadow-sm" style={{ backgroundColor: "#fff", borderRadius: "8px", overflow: "hidden" }}>
            <thead style={{ backgroundColor: "#f0f0f0" }}>
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Imagen</th>
                <th>Categoría</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {(categoryId ? category : dataProducts).map((e, i) => (
                <tr key={i}>
                  <td>{e.id}</td>
                  <td>{e.name}</td>
                  <td style={{ maxWidth: "250px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {e.description}
                  </td>
                  <td>${e.price}</td>
                  <td>{e.stock}</td>
                  <td>
                    {e.imageUrl
                      ? (<img src={e.imageUrl} alt={`Imagen de ${e.name}`} style={{ width: "40px", height: "auto", borderRadius: "4px" }} />)
                      : (<span className="text-muted">Sin imagen</span>)}
                  </td>
                  <td>{e.category?.name || "Sin categoría"}</td>
                  <td>
                    <div className="btn-group" role="group">
                      <button type="button" className="btn btn-outline-danger btn-sm"
                        onClick={() => AlertDelete(
                          e.id, 
                          "¿De seguro quieres eliminar el producto?", 
                          `El producto que quieres eliminar es ${e.name}`,
                          () => {
                            // Si estamos viendo una categoría específica, recargamos esos productos
                            if (categoryId) {
                              getProductbyCategoryID(categoryId).then(response => {
                                setCategory(response.data?.products || []);
                              });
                            } else {
                              // Si estamos viendo todos los productos, recargamos todos
                              getProducts().then(response => {
                                setDataProducts(response.data.products);
                              });
                            }
                          }
                        )}>
                        <MdDelete />
                      </button>
                      <SeeProduct id={e.id} />
                      <button type="button" className="btn btn-outline-success btn-sm" onClick={() => viewUpdate(e.id)}>
                        <RiEditBoxLine />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </>
  );
};
