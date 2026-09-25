import { createContext, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { apiFetch } from "../services/api";
import useGym from "../hooks/useGym";

export const CashDrawerContext = createContext();

export function CashDrawerProvider({ children }) {

    const [cashDrawer, setCashDrawer] = useState(null);
    const { authenticated, user } = useAuth()
    const { gym } = useGym()

    useEffect(() => {

        async function loadCashDrawer() {
            if (!user || !authenticated || !gym) {
                setCashDrawer(null);
                return;
            }

            try {
                const data = await apiFetch(`/cashdrawer/getcashdrawer?gymId=${gym?.id}`);
                if(data.success){
                    setCashDrawer(data.caja);
                };
            } catch (error) {
                throw error;
            }
        }

        loadCashDrawer();
    }, [user, authenticated, gym])



    return (
        <CashDrawerContext.Provider value={{ cashDrawer, setCashDrawer }}>
            {children}
        </CashDrawerContext.Provider>
    )

}

