    import axios from "axios"

    export const getProducts = async () => {
    try {
        const response = await axios.get('http://localhost:3030/products')
        return response
    } catch (error) {
        return {
            succes: false,
            message: "Lo sentimos, se a producido un error"
        }
    }
    }

    export const getCategories = async () => {
        try {
        const response = await axios.get('http://localhost:3030/categories')
        return response
        } catch (error) {
        return {
            succes: false,
            message: "Lo sentimos, se a producido un error"
        }
        }
    }
    

    export const postProduct = async (data) => {
        try {
            console.log(data)
            const response = await axios.post('http://localhost:3030/products', data)
            return response
        } catch (error) {
            return {
                success: false,
                message: "Lo sentimos, se ha producido un error"
            }
        }
    }

    export const deleteProduct = async (id) => {
        try {
            const response = await axios.delete('http://localhost:3030/products/'+id)
            return response
        } catch (error) {
            return {
                success: false,
                message: "Lo sentimos, se ha producido un error"
            }
        }
    }

    export const putProduct = async (id, data) => {
        try {
            const response = await axios.put(`http://localhost:3030/products/${id}`, data)
            return response
        } catch (error) {
            return {
                success: false,
                message: "Lo sentimos, se ha producido un error"
            }
        }
    }

    export const getProduct = async (id) => {
        try {
            const response = await axios.get(`http://localhost:3030/products/${id}`)
            
            return response
        } catch (error) {
            return {
                success: false,
                message: "Lo sentimos, se ha producido un error"
            }
        }
    }

    export const getProductbyCategoryID = async (id) => {
        if (id === "0" || !id) {
            return getProducts();
        }
        try {
            const response = await axios.get(`http://localhost:3030/products/category/${id}`);
            return response.data.products ? response : { data: { products: [] } };
        } catch (error) {
            return { data: { products: [] } }; // Devuelve una estructura consistente
        }
    }