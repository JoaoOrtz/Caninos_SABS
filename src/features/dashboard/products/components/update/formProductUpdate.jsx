import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { AlertSuccess } from "../../../../../shared/alert/success";
import { checkProductName, getCategories, getProduct, putProduct } from "../../service/product.service";

export const FormProductUpdate = () => {
  const navegate = useNavigate();
  const { id } = useParams();

  const [formProduct, setFormProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    imageUrl: "",
    categoryId: ""
  });

  const [originalValues, setOriginalValues] = useState({
    name: ""
  });

  const [categories, setCategories] = useState([]);

  const [alertError, setAlertError] = useState({
    show: false,
    title: "",
    message: "",
    type: "warning"
  });

  useEffect(() => {
    const data = async () => {
      const response = await getCategories();
      setCategories(response.data.categories);

      if (id) {
        const response = await getProduct(id);
        if (response.data.product) {
          setFormProduct({
            name: response.data.product.name,
            description: response.data.product.description,
            price: response.data.product.price,
            stock: response.data.product.stock,
            imageUrl: response.data.product.imageUrl,
            categoryId: response.data.product.categoryId,
          });

          setOriginalValues({
            name: response.data.product.name,
          });
        }
      }
    };
    data();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormProduct({
      ...formProduct,
      [name]: value,
    });
  };

  const validatorName = async () => {
    const name = formProduct.name.trim();
    const originalName = originalValues.name.trim();

    if (name.toLowerCase() === originalName.toLowerCase()) {
      return true; // no ha cambiado, no valida
    }

    const nameExists = await checkProductName(name);
    if (nameExists) {
      setAlertError({
        show: true,
        title: "Error",
        message: "Ya existe un producto con este nombre",
        type: "danger",
      });
      return false;
    }

    setAlertError((prev) => ({ ...prev, show: false }));
    return true;
  };

  const HandleSubmint = async (e) => {
    e.preventDefault();

    const isValid = await validatorName();
    if (!isValid) return;

    const response = await putProduct(id, formProduct);
    if (response.data.status === "success") {
      navegate("/dashboard/Productos");
      AlertSuccess(
        "Producto actualizado",
        "El producto se ha actualizado correctamente"
      );
    }
  };

  const back = () => {
    navegate("/dashboard/Productos");
  };

  return (
    <>
      <button
        type="button"
        onClick={back}
        className="btn btn-primary rounded-circle d-flex align-items-center p-2 justify-content-center"
        style={{ width: "40px", height: "40px" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          style={{ width: "20px", height: "20px" }}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 19.5L8.25 12l7.5-7.5"
          />
        </svg>
      </button>

      <div className="container">
        <h2 className="mb-4 mt-3">Editar Producto</h2>

        {alertError.show && (
          <div
            className={`alert alert-${alertError.type} alert-dismissible fade show mb-2`}
            role="alert"
          >
            <strong>{alertError.title}</strong> {alertError.message}
          </div>
        )}

        <form onSubmit={HandleSubmint}>
          <div className="mb-3">
            <label className="form-label">Nombre</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formProduct.name}
              onChange={handleChange}
              onBlur={validatorName}
              placeholder="Nombre del producto"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Descripción</label>
            <textarea
              className="form-control"
              name="description"
              value={formProduct.description}
              onChange={handleChange}
              placeholder="Descripción del producto"
            />
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label">Precio</label>
              <input
                type="number"
                className="form-control"
                name="price"
                value={formProduct.price}
                onChange={handleChange}
                placeholder="Precio"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Stock</label>
              <input
                type="number"
                className="form-control"
                name="stock"
                value={formProduct.stock}
                onChange={handleChange}
                placeholder="Cantidad disponible"
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label">Imagen (URL)</label>
            <input
              type="text"
              className="form-control"
              name="imageUrl"
              value={formProduct.imageUrl}
              onChange={handleChange}
              placeholder="https://..."
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Categoría</label>
            <select
              className="form-select"
              name="categoryId"
              value={formProduct.categoryId}
              onChange={handleChange}
            >
              <option value="">Seleccione una categoría</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-primary">
            Actualizar
          </button>
        </form>
      </div>
    </>
  );
};
