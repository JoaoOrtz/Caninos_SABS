import React, { useEffect, useState } from 'react'
import { getCategories, getProduct, getProducts, putProduct } from '../../service/product.service'
import { useNavigate, useParams } from 'react-router-dom'
import { AlertSuccess } from '../../../../../shared/alert/success'

export const FormProductUpdate = () => {
    const navegate = useNavigate()
    const { id } = useParams()

    //Objeto de datos
    const [formProduct, setFormProduct] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        imageUrl: "",
        categoryId: ""
    })

    const [alertError, setAlertError] = useState({
        show: false,
        title: "",
        message: "",
        type: "warning"
    });

    const [categories, setCategories] = useState([])

    useEffect(() => {
        const data = async () => {
            const response = await getCategories()
            setCategories(response.data.categories)
            if (id) {
                const response = await getProduct(id)
                if (response.data.product) {
                    setFormProduct({
                        name: response.data.product.name,
                        description: response.data.product.description,
                        price: response.data.product.price,
                        stock: response.data.product.stock,
                        imageUrl: response.data.product.imageUrl,
                        categoryId: response.data.product.categoryId
                    })
                }
            }
        }
        data()
    }, [id])

    //Funcion para recolección los datos
    const ChangeData = (e) => {
        const { name, value } = e.target
        setFormProduct({
            ...formProduct,
            [name]: value
        })
    }

    const HandleSubmint = async (e) => {
        e.preventDefault()
        if (!validatorName()) {
            return;
        }

        const response = await putProduct(id, formProduct)
        if (response.data.status === "success") {
            navegate('/dashboard/Productos')
            AlertSuccess('Producto actualizado', 'El producto se ha actualizado correctamente')
        }
    }

    const checkProductName = async (productName) => {
        try {
            const response = await getProducts();
            const products = response.data.products || [];
            return products.some(product =>
                product.name.trim().toLowerCase() === productName.trim().toLowerCase()
            );
        } catch (error) {
            console.error("Error al verificar el nombre del producto:", error);
            return false; // Asumimos que no existe para no bloquear la UI
        }
    };

    const validatorName = async () => {
        const name = formProduct.name.trim();
        if (!name) return true; // Ya se valida en validateForm

        const nameExists = await checkProductName(name);
        if (nameExists) {
            setAlertError({
                show: true,
                title: "Error",
                message: "Ya existe un producto con este nombre",
                type: "danger"
            });
            return false;
        }

        // Limpia el error si todo está bien
        setAlertError(prev => ({ ...prev, show: false }));
        return true;
    }

    const back = () => {
        navegate('/dashboard/Productos')
    }

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
                <h2 className="mb-4 mt-3">Formulario de actualización de Producto</h2>
                {alertError.show && (
                    <div className={`alert alert-${alertError.type} alert-dismissible fade show mb-2`} role="alert">
                        <strong>{alertError.title}</strong> {alertError.message}
                    </div>
                )}
                <form onSubmit={HandleSubmint}>
                    <div className="mb-3">
                        <label htmlFor="nombre" className="form-label">Nombre</label>
                        <input
                            name='name'
                            onBlur={validatorName}
                            value={formProduct.name}
                            onChange={ChangeData}
                            type="text"
                            className="form-control"
                            placeholder="Ingrese el nombre del producto"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="descripcion" className="form-label">Descripción</label>
                        <textarea
                            name='description'
                            value={formProduct.description}
                            onChange={ChangeData}
                            className="form-control"
                            id="descripcion"
                            rows="3"
                            placeholder="Ingrese una descripción"
                        ></textarea>
                    </div>

                    <div className="row mb-3">
                        <div className="col-md-6">
                            <label htmlFor="precio" className="form-label">Precio</label>
                            <div className="input-group">
                                <span className="input-group-text">$</span>
                                <input
                                    name='price'
                                    onKeyDown={(e) => {
                                        // Evita que se ingresen puntos (decimales), comas o signos negativos
                                        if (['.', ',', '-', '+', 'e', 'E'].includes(e.key)) {
                                            e.preventDefault();
                                        }
                                    }}
                                    value={formProduct.price}
                                    onChange={ChangeData}
                                    type="number"
                                    className="form-control"
                                    placeholder="0.00"
                                    step="0.01"
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <label htmlFor="cantidad" className="form-label">Cantidad</label>
                            <input
                                name='stock'
                                onKeyDown={(e) => {
                                    // Evita que se ingresen puntos (decimales), comas o signos negativos
                                    if (['.', ',', '-', '+', 'e', 'E'].includes(e.key)) {
                                        e.preventDefault();
                                    }
                                }}
                                value={formProduct.stock}
                                onChange={ChangeData}
                                type="number"
                                className="form-control"
                                placeholder="0"
                                min="0"
                            />
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="imagen" className="form-label">Imagen (URL)</label>
                        <input
                            name='imageUrl'
                            value={formProduct.imageUrl}
                            onChange={ChangeData}
                            type="url"
                            className="form-control"
                            placeholder="https://ejemplo.com/imagen.jpg"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="categoria" className="form-label">Categoría</label>
                        <select name='categoryId' value={formProduct.categoryId} onChange={ChangeData} className="form-select" id="categoria">
                            <option key={0} value={0}>Seleccione una categoría</option>
                            {categories.map((e, i) => (
                                <option key={i} value={e.id}>{e.name}</option>
                            ))}
                        </select>
                    </div>

                    <button type="submit" className="btn btn-primary">Guardar</button>
                </form>
            </div>
        </>
    );
}
