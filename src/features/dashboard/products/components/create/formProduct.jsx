import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getCategories, postProduct } from '../../service/product.service';
import { AlertSuccess } from '../../../../../shared/alert/success';

export const FormProduct = () => {
    const navegate = useNavigate()

    //Objeto de datos
    const [formProduct, setFormProduct] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        imageUrl: "",
        categoryId: ""
    })

    const [categories, setCategories] = useState([])

    useEffect(() => {
        const data = async () => {
            const response = await getCategories()
            setCategories(response.data.categories)
        }
        data()
    })

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
        const response = await postProduct(formProduct)
        console.log(response);
        if (response.data.status === "success") {
            navegate('/dashboard/Productos')
            AlertSuccess('Producto creado', 'El producto se ha creado correctamente')
        }

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
                <h2 className="mb-4 mt-3">Formulario de Producto</h2>
                <form onSubmit={HandleSubmint}>
                    <div className="mb-3">
                        <label htmlFor="nombre" className="form-label">Nombre</label>
                        <input
                            name='name'
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
