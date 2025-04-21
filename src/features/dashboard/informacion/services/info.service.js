import axios from "axios";
import { data } from "react-router-dom";

export const getInfo = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3030/Objetivos-mision-vision"
    );
    return response;
  } catch (error) {
    return {
      success: false,
      message: "Lo sentimos, se ha producido un error",
    };
  }
};

export const putInfo = async (id,data) => {
  try {
    const response = await axios.put("http://localhost:3030/Objetivos-mision-vision/"+id,data);
    return response;
  } catch (error) {
    return {
      success: false,
      message: "Lo sentimos, se ha producido un error",
    };
  }
};
