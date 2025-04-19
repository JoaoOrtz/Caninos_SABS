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

export const getLogin = async () => {
    try {
        const response = await axios.get('http://localhost:3030/login')
        console.log(response);
        
        return response.data
    } catch (error) {
        return {
            success: false,
            message: "Lo sentimos, se ha producido un error"
        }
    }
}

export {PostLogin}
