import axios from "axios";

export const getCategories = async () => {
    try {
        const response = await axios.get('http://localhost:3030/categories')
        return response
    } catch (error) {
        return{
            success: false,
            message: "Lo sentimos, se ha producido un error"
        }
    }
}