import axios from "axios"

export const getProducts = async () => {
    try {
        const response = await axios.get('http://localhost:3030/products')
        return response
    } catch (error) {
        return {
            success: false,
            message: "Lo sentimos, se ha producido un error"
        }
    }
}