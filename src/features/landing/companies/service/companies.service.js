import axios from "axios";

export const getCompanies =  async () => {
    try {
        const response = await axios.get("http://localhost:3030/companies")
        console.log(response);
        return response
    } catch (error) {
        return{
            success: false,
            message: "Lo sentimos, se ha producido un error"
        }
    }
}