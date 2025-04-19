import axios from "axios";

export const getUsers = async () => {
  try {
    const response = await axios.get("http://localhost:3030/users");
    console.log(response);
    return response;
  } catch (error) {
    return {
      succes: false,
      message: "Lo sentimos, se a producido un error",
    };
  }
};

export const postUsers = async (data) => {
  try {
    console.log(data);
    
    const response = await axios.post("http://localhost:3030/users", data);
    return response;
  } catch (error) {
    return {
      success: false,
      message: "Lo sentimos, se ha producido un error",
    };
  }
};

export const deleteUsers = async (id) => {
  try {
    const response = await axios.delete("http://localhost:3030/users/" + id);
    return response;
  } catch (error) {
    return {
      success: false,
      message: "Lo sentimos, se ha producido un error",
    };
  }
};

export const putUsers = async (id, data) => {
  try {
    const response = await axios.put(`http://localhost:3030/users/${id}`, data);
    return response;
  } catch (error) {
    return {
      success: false,
      message: "Lo sentimos, se ha producido un error",
    };
  }
};

export const getOneUser = async (id) => {
  try {
    const response = await axios.get(`http://localhost:3030/users/${id}`);

    return response;
  } catch (error) {
    return {
      success: false,
      message: "Lo sentimos, se ha producido un error",
    };
  }
};


