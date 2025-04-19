import axios from "axios";

export const getInfo = async () => {
  try {
    const response = await axios.get("http://localhost:3030/Objetivos-mision-vision");
    console.log(response);
    return response;
  } catch (error) {
    return {
      succes: false,
      message: "Lo sentimos, se a producido un error",
    };
  }
};
