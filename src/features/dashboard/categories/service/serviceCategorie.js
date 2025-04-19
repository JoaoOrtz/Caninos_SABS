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
    console.log(data);
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