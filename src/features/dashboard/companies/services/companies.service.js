import axios from "axios";

export const getCompanies = async () => {
  try {
      const response = await axios.get('http://localhost:3030/companies'); 
      return response;
  } catch (error) {
      return {
          success: false,
          message: "Lo sentimos, se ha producido un error"
      };
  }
};

export const getCompany = async (id) => {
  try {
      const response = await axios.get(`http://localhost:3030/companies/${id}`);
      return response;
  } catch (error) {
      return {
          success: false,
          message: "Lo sentimos, se ha producido un error"
      };
  }
};

export const postCompany = async (data) => {
  try {
      const response = await axios.post('http://localhost:3030/companies', data);
      return response;
  } catch (error) {
      return {
          success: false,
          message: "Lo sentimos, se ha producido un error"+"Error:"+error
      };
  }
};

export const deleteCompany = async (id) => {
  try {
      const response = await axios.delete(`http://localhost:3030/companies/${id}`);      
      return response;
  } catch (error) {
      return {
          success: false,
          message: "Lo sentimos, se ha producido un error"
      };
  }
};

export const putCompany = async (id, data) => {
  try {
      const response = await axios.put(`http://localhost:3030/companies/${id}`, data);
      return response;
  } catch (error) {
      return {
          success: false,
          message: "Lo sentimos, se ha producido un error"
      };
  }
};