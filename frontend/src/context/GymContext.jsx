import { createContext, useState, useEffect, use } from "react";
import { apiFetch } from "../services/api"
import useAuth from "../hooks/useAuth"

export const GymContext = createContext();

export function GymProvider({ children }) {

    const [gym, setGym] = useState(null);
    const {authenticated, user} = useAuth()

    useEffect(() => {

        async function loadGym(){
            if(!user || !authenticated){
                setGym(null);
                return;
            }


            try {
                const data = await apiFetch("/gyms/getGym");
                setGym(data)
            } catch (error) {
                throw(error);
            }
        }

        loadGym();



    }, [user, authenticated])


    return (
        <GymContext.Provider value={{gym, setGym}}>
            {children}
        </GymContext.Provider>
    )

}