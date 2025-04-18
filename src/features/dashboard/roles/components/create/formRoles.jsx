import React, {useState} from "react";
import { postRol } from "../../service/roles.service";
import { useNavigate } from "react-router-dom";
import { AlertSuccess } from "../../../../../shared/alert/success";

export const FormRols = () => {
    const navigate = useNavigate()

    const [formRol, setFormRol] = useState({
        name: "",
        description: ""
    })

    //Funcion para recolección los datos

    const ChangeData = (e) => {
        const {name, value} = e.target
        setFormRol({
            ...formRol,
            [name]: value
        })
    }

    const HandleSubmint = async (e) => {
        e.preventDefault()
        const response = await postRol(formRol)
        console.log(response)
        if (response.status === 201){
            navigate('/dashboard/Roles')
            AlertSuccess('Rol creado', 'El Rol se ha creado correctamente')
        }
    }

    const back = () => {
        navigate('/dashboard/Roles')
    }

    return(
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
                <h2 className="mb-4 mt-3">Formulario de Rols</h2>
                <form onSubmit={HandleSubmint}>
                    <div className="mb-3">
                        <label htmlFor="nombre" className="form-label">Nombre</label>
                        <input
                            name='name'
                            value={formRol.name}
                            onChange={ChangeData}
                            type="text"
                            className="form-control"
                            placeholder="Ingrese el nombre del rol"
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="descripcion" className="form-label">Descripción</label>
                        <textarea
                            name='description'
                            value={formRol.description}
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


}