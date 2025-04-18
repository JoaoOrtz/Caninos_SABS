import axios from "axios";

export const getRols = async () => {
    try {
        const response = await axios.get('http://localhost:3030/roles')
        console.log(response)
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
        console.log(data)
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
    console.log(response)
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

