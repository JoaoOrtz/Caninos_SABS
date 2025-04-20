import axios from "axios"

export const getRole = async (id) => {
    try {
        const response = await axios.get('http://localhost:3030/roles/'+id)        
        return response
    } catch (error) {
        return {
            success: false,
            message: "Lo sentimos, se ha producido un error"
        }
    }
}

export const getRoles = async () => {
    try {
        const response = await axios.get('http://localhost:3030/roles')
        return response
    } catch (error) {
        return {
            success: false,
            message: "Lo sentimos, se ha producido un error"
        }
    }
}
