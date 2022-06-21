import client from "../api/client/api_client";
import handleErrors from "./handle_errors";


export const addEmployee = async (user) => {
    try {
        const response = await client.post("/add-employee", user);
        return response.data;
    } catch (error) {
        handleErrors(error);
    }
}

export const getEmployees = async (query) => {
    const { offset, limit } = query;
    try {
        const response = await client.get("/employees", { params: { offset, limit } })
        const employees = response.data.data.rows;
        const totalCount = response.data.data.count;
        return { employees, totalCount }
    } catch (error) {
        handleErrors(error);
    }
}

export const uploadCSV = async (file) => {
    try {
        const input = { csv: file };
        const response = await client.post("/upload-employees-csv", input,{headers:{"content-type":"multipart/form-data"}});
        return response.data;
    } catch (error) {
        handleErrors(error);
    }
}


export const sendEmail = async (emailData) => {
    try {
        const response = await client.post("/send-email", emailData);
        return response.data;
    } catch (error) {
        handleErrors(error);
    }
}




