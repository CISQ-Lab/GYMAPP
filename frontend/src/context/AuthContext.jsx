import { createContext, useState, useEffect } from "react";
import { apiFetch } from "../services/api"

export const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {

        const token = localStorage.getItem("token");

        async function loadUserData() {

            try {

                const data = await apiFetch("/users/me");
                if (data.user[0]) {
                    setUser(data.user[0]);
                    setAuthenticated(true);
                }


            } catch (error) {
                localStorage.removeItem("token");
                setUser(null);
                setAuthenticated(false);

            }
            finally {
                setLoading(false);
            }


        }

        if (token) {
            loadUserData();
        }
        else{
            setLoading(false);
        }



    }, [])

    async function login(email, password) {

        setLoading(true);

        try {

            const data = await apiFetch("/auth/login", {
                method: "POST",
                body: JSON.stringify({
                    email,
                    password
                })
            })

            if (data.token) {
                localStorage.setItem("token", data.token);
            }
            const letUser = await apiFetch("/users/me");
            setUser(letUser.user[0])
            setAuthenticated(true);

        }
        finally {
            setLoading(false);
        }
    }

    function logout() {
        setLoading(true);
        localStorage.removeItem("token");
        setUser(null);
        setAuthenticated(false);
        setLoading(false);
    }

    return (
        <AuthContext.Provider value={{ user, loading, authenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    )

}