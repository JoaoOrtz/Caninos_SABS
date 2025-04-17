import axios from "axios";

const PostLogin = async (data) => {
  try {
    const response = await axios.post("http://localhost:3030/login", data);
    localStorage.setItem("Token", JSON.stringify(response.data.token))
    return response;
  } catch (error) {
    return {
      status: error,
      message: "Credenciales inválidas",
    };
  }
};

export {PostLogin}
