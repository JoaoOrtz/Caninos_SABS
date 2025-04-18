import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCategories,
  getProductbyCategoryID,
  getProducts,
} from "./service/product.service";
import { MdDelete } from "react-icons/md";
import { RiEditBoxLine } from "react-icons/ri";
import { AlertDelete } from "./components/delete/delete";
import { SeeProduct } from "./components/see/see.product";

export const ProductDashboard = () => {
  const navigate = useNavigate();
  const [dataProducts, setDataProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState([]);
  const [categoryId, setCategoryId] = useState(0);
  
  // Estados separados para errores
  const [categoryError, setCategoryError] = useState({
    show: false,
    title: "",
    message: "",
    type: "warning"
  });
  
  const [productError, setProductError] = useState({
    show: false,
    title: "",
    message: "",
    type: "warning"
  });

  // Verificar categorías
  const checkCategories = (categories) => {
    if (!categories || categories.length === 0) {
      setCategoryError({
        show: true,
        title: "Aviso",
        message: "No se encontró ninguna categoría.",
        type: "warning"
      });
      return true;
    }
    setCategoryError({ ...categoryError, show: false });
    return false;
  };

  // Verificar productos
  const checkProducts = (products) => {
    if (!products || products.length === 0) {
      setProductError({
        show: true,
        title: "Aviso",
        message: "No se encontró ningún producto.",
        type: "warning"
      });
      return true;
    }
    setProductError({ ...productError, show: false });
    return false;
  };

  // Trae los productos
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        const products = response.data?.products || [];
        setDataProducts(products);
        checkProducts(products);
      } catch (err) {
        setProductError({
          show: true,
          title: "Error",
          message: "Error al cargar los productos",
          type: "danger"
        });
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  // Trae las categorías
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        const categories = response.data?.categories || [];
        setCategories(categories);
        checkCategories(categories);
      } catch (err) {
        setCategoryError({
          show: true,
          title: "Error",
          message: "Error al cargar las categorías",
          type: "danger"
        });
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, []);

  // Trae productos por categoría
  useEffect(() => {
    if (categoryId && categoryId !== 0) {
      const fetchProductsByCategory = async () => {
        try {
          const response = await getProductbyCategoryID(categoryId);
          const products = response.data?.products || [];
          setCategory(products);
          checkProducts(products);
        } catch (err) {
          setProductError({
            show: true,
            title: "Error",
            message: "Error al cargar los productos de la categoría",
            type: "danger"
          });
          console.error("Error fetching products by category:", err);
        }
      };

      fetchProductsByCategory();
    }
  }, [categoryId]);

  const viewForm = () => {
    if (categoryError.show) return; // No navegar si hay error de categorías
    navigate("/dashboard/nuevo-producto");
  };

  const viewUpdate = (id) => {
    navigate("/dashboard/editar-producto/" + id);
  };

  const handleCategoryChange = (e) => {
    const value = parseInt(e.target.value);
    setCategoryId(value);
    if (value === 0) {
      setCategory([]);
      checkProducts(dataProducts);
    }
  };

  // Inicializar popovers de Bootstrap
  useEffect(() => {
    if (categoryError.show) {
      const popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'));
      popoverTriggerList.map(function (popoverTriggerEl) {
        return new window.bootstrap.Popover(popoverTriggerEl);
      });
    }
  }, [categoryError.show]);

  return (
    <div className="container-fluid">
      <div className="row g-3 p-2 align-items-center">
        <div className="col">
          <h2>Lista De Productos</h2>
        </div>
        <div className="col-auto ms-auto">
          {categoryError.show ? (
            <button
              type="button"
              className="btn btn-primary"
              data-bs-container="body"
              data-bs-toggle="popover"
              data-bs-placement="bottom"
              data-bs-content="No puedes agregar productos sin categorías. Primero crea al menos una categoría."
              title="Acción no disponible"
            >
              Nuevo producto
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-primary"
              onClick={viewForm}
            >
              Nuevo producto
            </button>
          )}
        </div>
      </div>

      {/* Mensaje de error para categorías */}
      {categoryError.show && (
        <div className={`alert alert-${categoryError.type} alert-dismissible fade show mb-2`} role="alert">
          <strong>{categoryError.title}</strong> {categoryError.message}
        </div>
      )}

      {/* Mensaje de error para productos */}
      {productError.show && (
        <div className={`alert alert-${productError.type} alert-dismissible fade show mb-2`} role="alert">
          <strong>{productError.title}</strong> {productError.message}
        </div>
      )}

      <div className="row g-2 p-2">
        <div className="col-md-4 col-sm-12">
          <select
            className="form-select shadow-sm"
            style={{ borderRadius: "8px" }}
            aria-label="Filtrar por categoría"
            onChange={handleCategoryChange}
            value={categoryId}
          >
            <option value={0}>Todas las categorías</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="table-responsive">
        <table
          className="table table-hover align-middle shadow-sm"
          style={{
            backgroundColor: "#fff",
            borderRadius: "8px",
            overflow: "hidden",
          }}
        >
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
            {(categoryId && categoryId !== 0 ? category : dataProducts)?.map((product, index) => (
              product && (
                <tr key={product.id || index}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td
                    style={{
                      maxWidth: "250px",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {product.description}
                  </td>
                  <td>${product.price}</td>
                  <td>{product.stock}</td>
                  <td>
                    {product.imageUrl ? (
                      <img
                        src={product.imageUrl}
                        alt={`Imagen de ${product.name}`}
                        style={{
                          width: "40px",
                          height: "auto",
                          borderRadius: "4px",
                        }}
                      />
                    ) : (
                      <span className="text-muted">Sin imagen</span>
                    )}
                  </td>
                  <td>{product.category?.name || "Sin categoría"}</td>
                  <td>
                    <div className="btn-group" role="group">
                      <button
                        type="button"
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => AlertDelete(
                          product.id,
                          "¿De seguro quieres eliminar el producto?",
                          `El producto que quieres eliminar es ${product.name}`,
                          () => {
                            if (categoryId && categoryId !== 0) {
                              getProductbyCategoryID(categoryId).then(response => {
                                const updatedCategoryProducts = response.data?.products || [];
                                setCategory(updatedCategoryProducts);
                                checkProducts(updatedCategoryProducts);
                              });
                            }
                            getProducts().then(response => {
                              const updatedProducts = response.data?.products || [];
                              setDataProducts(updatedProducts);
                              if (categoryId === 0) {
                                checkProducts(updatedProducts);
                              }
                            });
                          }
                        )}
                      >
                        <MdDelete />
                      </button>
                      <SeeProduct id={product.id} />
                      <button
                        type="button"
                        className="btn btn-outline-success btn-sm"
                        onClick={() => viewUpdate(product.id)}
                      >
                        <RiEditBoxLine />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};