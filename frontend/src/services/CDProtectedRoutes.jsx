import useCD from "../hooks/useCD"
import { Navigate, Outlet } from "react-router-dom";
import showError from "../components/messages/showError";

export default function CDProtectedRoutes(){

    const { cashDrawer } = useCD()

    if (!cashDrawer) {

        showError("Debes abrir una caja para ingresar a esta pagina");
        return <Navigate to={"/Dashboard"} replace/>
    }
    else{
        return <Outlet/>
    }

}