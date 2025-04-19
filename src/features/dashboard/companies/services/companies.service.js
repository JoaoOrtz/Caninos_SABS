import axios from "axios"


export const getCompanies=async () => {
  try {
    const response= axios.get('http://localhost:3030/companies')
    return response
  } catch (error) {
    return {
        success: false,
        message: "Lo sentimos, se ha producido un error"
    }
  }
}
