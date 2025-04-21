import axios from "axios";

export const getCategories = async () => {
  try {
    const response = await axios.get("http://localhost:3030/categories");
    return response;
  } catch (error) {
    return {
      sucess: false,
      message: "lo sentimos, se ha producido un error",
    };
  }
};

export const postCategorie = async (data) => {
  try {
    const response = await axios.post("http://localhost:3030/categories", data);
    return response;
  } catch (error) {
    return { 
        sucess: false, 
        message: "lo sentimos, se ha producido un error" };
  }
};

export const deleteCategorie = async (id) => {
  try {
    const response = await axios.delete(
      "http://localhost:3030/categories/" + id
    );
    return response;
  } catch (error) {
    return { 
        sucess: false, 
        message: "lo sentimos, se ha producido un error" };
  }
};

export const putCategorie = async (id, data) => {
  try {
    const response = await axios.put(`http://localhost:3030/categories/${id}`, data);
    return response;
  } catch (error) {
    return { 
        sucess: false, 
        message: "lo sentimos, se ha producido un error" };
  }
};

export const getCategorie = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3030/categories/${id}`);
      return response;
    } catch (error) {
      return { 
          sucess: false, 
          message: "lo sentimos, se ha producido un error" };
    }
  };

  // --------------------------------

  export const checkCategorieName = async (name) => {
    try {
      const response = await axios.get('http://localhost:3030/categories')

      const categories = response?.data?.categories// Suponiendo que la respuesta contiene una lista de productos      
  
      // Verificar si ya existe un producto con el mismo nombre (ignorando mayúsculas/minúsculas)

      const categorieExists = categories.some((categorie) => categorie.name.trim().toLowerCase() === name.trim().toLowerCase())

      return categorieExists;

    } catch (error) {
      console.error("Error al verificar el nombre de la categoría: ", error)
      return false;
    }
  }