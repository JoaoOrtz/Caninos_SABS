import React, { useEffect, useState } from 'react';
import { FiEye } from "react-icons/fi";
import { getProduct } from '../../service/product.service';

export const SeeProduct = ({ id }) => {
    const [dataProduct, setDataProduct] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await getProduct(id);
            setDataProduct(response.data.product);
        };
        fetchData();
    }, [id]);

    return (
        <>
            <button type="button" className="btn btn-warning" data-bs-toggle="modal" data-bs-target="#productModal">
                <FiEye />
            </button>

            <div className="modal fade" id="productModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg"> {/* ancho más amplio */}
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Ver producto</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>

                        {/* Contenedor scroll horizontal */}
                        <div className="modal-body" style={{ overflowX: 'auto' }}>
                            {dataProduct ? (
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Nombre</th>
                                            <th>Descripción</th>
                                            <th>Precio</th>
                                            <th>Cantidad</th>
                                            <th>Imagen</th>
                                            <th>Categoría</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>{dataProduct.id}</td>
                                            <td>{dataProduct.name}</td>
                                            <td>{dataProduct.description}</td>
                                            <td>${dataProduct.price}</td>
                                            <td>{dataProduct.stock}</td>
                                            <td>
                                                {dataProduct.urlImage ? (
                                                    <img
                                                        src={dataProduct.urlImage}
                                                        alt={`Imagen de ${dataProduct.name}`}
                                                        style={{ width: "50px", height: "auto" }}
                                                    />
                                                ) : (
                                                    <span>No hay imagen</span>
                                                )}
                                            </td>
                                            <td>{dataProduct.category?.name}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            ) : (
                                <p>Cargando producto...</p>
                            )}
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
