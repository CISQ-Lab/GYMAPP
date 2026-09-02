import { API_URL } from '../config/env';

export async function apiFetch(endpoint, options = {}) {

    const token = localStorage.getItem("token")

    const headers = {
        
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers
    }
    if (!(options.body instanceof FormData)) {
        headers["Content-Type"] = "application/json";
    }

    const url = API_URL.concat(endpoint);

    try {
        const response = await fetch(url, { ...options, headers });
        
        const data = await response.json(); 
        if (!response.ok) {
            throw new Error(data.message);
        }
        return data;
    }
    catch(error){
        throw error;
    }
    


}