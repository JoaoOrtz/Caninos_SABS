import axios from "axios";

export const getRols = async () => {
    try {
        const response = await axios.get('http://localhost:3030/roles')
        return response
    } catch (error) {
        return {
            success: false,
            message: "lo sentimos, se ha producido un error"
        }
    }
}

export const postRol = async (data) => {
    try {
        const response = await axios.post('http://localhost:3030/roles', data)
        return response
    }catch (error) {
        return {
            success: false,
            message: "lo sentimos, se ha producido un error"
        }
    }
}

export const deleteRol = async (id) => {
    try {
    const response = await axios.delete('http://localhost:3030/roles/'+id)
    return response
    } catch (error) {
        return {
            success: false,
            message: "lo sentimos, se ha producido un error"
        }
    }
}

export const putRol = async (id, data) => {
    try{
        const response = await axios.put(`http://localhost:3030/roles/${id}`, data)
        return response
    } catch (error) {
        return {
            success: false,
            message: "lo sentimos, se ha producido un error"
        }
    }
}

export const getRol = async (id) => {
    try{
        const response = await axios.get(`http://localhost:3030/roles/${id}`)

        return response
    }catch (error) {
        return{
            success: false,
            message: "lo sentimos, se ha producido un error"
        }
    }
}

// -------------------------------

export const checkRolName = async (name) => {
    try {
        const response = await axios.get('http://localhost:3030/roles')

        const rols = response?.data // Suponiendo que la respuesta contiene una lista de productos
  
        // Verificar si ya existe un producto con el mismo nombre (ignorando mayúsculas/minúsculas)
        console.log(response)

        const rolExists = rols.some(
            (rol) => rol.name.trim().toLowerCase() === name.trim().toLowerCase()
        )

        return rolExists

    } catch (error) {
        console.error("Error al verificar el nombre del rol:", error);
        return false;
    }
}

