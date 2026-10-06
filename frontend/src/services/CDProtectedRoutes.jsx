import useCD from "../hooks/useCD"
import { Navigate, Outlet } from "react-router-dom";
import showError from "../components/messages/showError";
import Spinner from "../components/layout/Spinner";

export default function CDProtectedRoutes(){

    const { cashDrawer, loading } = useCD()

    if(loading){
        return <Spinner></Spinner>
    }

    if (!cashDrawer) {

        showError("Debes abrir una caja para ingresar a esta pagina");
        return <Navigate to={"/Dashboard"} replace/>
    }
    else{
        return <Outlet/>
    }

}