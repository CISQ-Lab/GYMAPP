import useAuth from "../hooks/useAuth";
import {Navigate, Outlet} from "react-router-dom"

export default function ProtectedRoutes(){

    const {loading, authenticated} = useAuth();

    if(!authenticated){
        return <Navigate to={"/"} replace/>
    }

    return <Outlet/>;

}
