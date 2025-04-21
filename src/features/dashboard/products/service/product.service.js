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

    export const getCategories = async () => {
        try {
        const response = await axios.get('http://localhost:3030/categories')
        return response
        } catch (error) {
        return {
            success: false,
            message: "Lo sentimos, se ha producido un error"
        }
        }
    }
    

    export const postProduct = async (data) => {
        try {
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

    // Agregar esta función al final de tu archivo product.service.js

export const checkProductName = async (name) => {
    try {
      const response = await axios.get('http://localhost:3030/products');
      
      const products = response?.data?.products; // Suponiendo que la respuesta contiene una lista de productos
  
      // Verificar si ya existe un producto con el mismo nombre (ignorando mayúsculas/minúsculas)
      const productExists = products.some(
        (product) => product.name.trim().toLowerCase() === name.trim().toLowerCase()
      );
  
      return productExists;
    } catch (error) {
      console.error("Error al verificar el nombre del producto:", error);
      return false;
    }
  };
  