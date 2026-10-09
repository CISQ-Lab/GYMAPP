import { createContext, useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { apiFetch } from "../services/api";
import useGym from "../hooks/useGym";

export const CashDrawerContext = createContext();

export function CashDrawerProvider({ children }) {

    const [cashDrawer, setCashDrawer] = useState(null);
    const [loading, setLoading] = useState(true);
    const { authenticated, user } = useAuth()
    const { gym } = useGym()

    const refresh = async () => {

        try {
            const data = await apiFetch(`/cashdrawer/getcashdrawer?gymId=${gym?.id}`);
            if (data.success) {
                setCashDrawer(data.caja);
            }
            else {
                setCashDrawer(null);
            }
        } catch (error) {
            throw error;
        }
    }

    useEffect(() => {

        async function loadCashDrawer() {
            if (!user || !authenticated || !gym?.id) {
                setCashDrawer(null);
                return;
            }

            try {
                const data = await apiFetch(`/cashdrawer/getcashdrawer?gymId=${gym?.id}`);
                if (data.success) {
                    setCashDrawer(data.caja);
                    setLoading(false);
                }
                else {
                    setCashDrawer(null);
                    setLoading(false);
                }
            } catch (error) {
                setLoading(false);
                throw error;
            }
        }

        loadCashDrawer();
    }, [user, authenticated, gym])



    function closeTurn() {
        setCashDrawer(null);
    }



    return (
        <CashDrawerContext.Provider value={{ cashDrawer, loading, closeTurn, setCashDrawer, refresh }}>
            {children}
        </CashDrawerContext.Provider>
    )

}

