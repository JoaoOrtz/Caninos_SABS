import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AlertSuccess } from '../../../../../shared/alert/success'
import { getCategorie, putCategorie } from '../../service/serviceCategorie'


export const UpdateCategorie = () => {

  const navigate = useNavigate()
  const {id} = useParams()

  // Objeto de datos

  const [formCategorie, setFormCategorie] = useState({
    name: "",
    description: ""
  })

  useEffect(() =>{
    const data = async () => {
      if (id) {
        const response = await getCategorie(id)
        if (response.data.category) {
          setFormCategorie({
            name: response.data.category.name,
            description: response.data.category.description
          })
        }
      }
    }
    data()
  }, [id])

// Recolección de datos

const changeData= (e) => {
  const {name, value} = e.target
  console.log(name,value)
  setFormCategorie({
    ...formCategorie,
    [name]:value
  })
}

const HandleSubmit = async (e) => {
  e.preventDefault()
  const response = await putCategorie(id, formCategorie)
  if (response.status === 200) {
    navigate('/dashboard/categorias')
    AlertSuccess('Rol actualizado','El rol se ha actualizado')
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
    <h2 className="mb-4 mt-3">Formulario de actualización de categoría</h2>
    <form onSubmit={HandleSubmit}>
        <div className="mb-3">
            <label htmlFor="nombre" className="form-label">Nombre</label>
            <input
                name='name'
                value={formCategorie.name}
                onChange={changeData}
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
                onChange={changeData}
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
