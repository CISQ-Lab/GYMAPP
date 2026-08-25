const API_URL = "http://localhost:3000/api";

export async function apiFetch(endpoint, options = {}) {

    const token = localStorage.getItem("token")

    const headers = {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers
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
        console.error(error);
        throw error;
    }
    


}