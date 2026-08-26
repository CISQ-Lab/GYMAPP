import useAuth from "../hooks/useAuth";
import {Navigate, Outlet} from "react-router-dom"

export default function ProtectedRoutes(){

    const {loading, authenticated} = useAuth();

    if(loading){
        return <p>Cargando...</p>
    }
    if(!authenticated){
        return <Navigate to={"/"} replace/>
    }

    return <Outlet/>;

}
