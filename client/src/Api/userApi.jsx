import { apiInstances } from "./apiInstances";

export const signupApi = async (payload) => {
    try {
        // console.log(payload);
        const response = await apiInstances.post("/api/Users/register", payload);
        return response.data;
    } catch (error) {
        return error;
    }
}
export const loginApi = async (payload) => {
    try {
        console.log(payload);
        const res = await apiInstances.post("/api/Users/login", payload);
        return res.data;
    } catch (error) {
        return error;
    }
}