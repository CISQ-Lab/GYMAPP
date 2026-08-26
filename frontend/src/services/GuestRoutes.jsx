import useAuth from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

export default function GuestRoutes(){
    const {authenticated, loading} = useAuth();

    if(loading){
        return <p>Cargando...</p>
    }

    if(authenticated){
        return <Navigate to={"/Dashboard"} replace/>
    }

    else{
        return <Outlet/>
    }

}