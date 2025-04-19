import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postCategorie } from "../../service/serviceCategorie";
import { AlertSuccess } from "../../../../../shared/alert/success";

export const CreateCategorie = () => {
  const navigate = useNavigate();

  const [formCategorie, setFormCategorie] = useState({
    name: "",
    description: ""
  });

//   recolección de datos

const ChangeData = (e) => {
    const {name, value} = e.target
    setFormCategorie({
        ...formCategorie,
        [name]: value
    })
}

const HandleSubmit = async (e) => {
    e.preventDefault()

    try {
        const response = await postCategorie(formCategorie)
        console.log(response)
        if (response.data.status === "success") {
            AlertSuccess('Categoría creada','La categoría se ha creado correctamente')
            navigate('/dashboard/categorias')
        }
    } catch (error) {
     console.log("Error al crear la categoría", error)   
    }
}

const back = () => {
    navigate('/dashboard/categorias')
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
        <h2 className="mb-4 mt-3">Formulario de Categorías</h2>
        <form onSubmit={HandleSubmit}>
            <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Nombre</label>
                <input
                    name='name'
                    value={formCategorie.name}
                    onChange={ChangeData}
                    type="text"
                    className="form-control"
                    placeholder="Ingrese el nombre de la categoría"
                />
            </div>

            <div className="mb-3">
                <label htmlFor="descripcion" className="form-label">Descripción</label>
                <textarea
                    name='description'
                    value={formCategorie.description}
                    onChange={ChangeData}
                    className="form-control"
                    id="descripcion"
                    rows="3"
                    placeholder="Ingrese una descripción"
                ></textarea>
            </div>

            <button type="submit" className="btn btn-primary">Guardar</button>

        </form>
    </div>
</>
  )
};
