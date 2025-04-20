  import React, { useState, useEffect } from 'react';
  import { getProducts } from './service/products.service';

  export const ProductsLanding = () => {
    const [products, setProducts] = useState([]);

    // Trae los productos
    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await getProducts();
          setProducts(response.data.products);          
        } catch (err) {
          console.error("Error fetching products:", err);
        }
      };

      fetchProducts();
    }, []);

    return (
      <div className="container pt-5 mt-5">
        <h1 className="text-center mb-4 text-info">Nuestros Productos</h1>
        <div className="row">
          {products.map((product) => (
            <div key={product.id} className="col-md-4 col-sm-6 mb-4">
              <div className="card h-100 shadow-lg">
                <img 
                  src={product.imageUrl === "" ? "../../public/img/no-hay-fotos.avif" : product.imageUrl } 
                  className="card-img-top img-fluid p-3" 
                  alt={product.name}
                  style={{height: '200px', objectFit: 'contain'}}
                />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text text-muted">
                    <small>{product.category?.name || "Sin categoría"}</small>
                  </p>
                  <p className="card-text">{product.description}</p>
                  <div className="d-flex justify-content-between align-items-center">
                    <span className="text-muted">Cantidad: {product.stock}</span>
                    <span className="fw-bold">${product.price}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }