import useAuth from "../hooks/useAuth";
import {Navigate, Outlet} from "react-router-dom"
import Spinner from "../components/spinner";

export default function ProtectedRoutes(){

    const {loading, authenticated, user} = useAuth();

    if(loading){
        return <Spinner/>
    }

    if(!authenticated || !user){
        return <Navigate to={"/"} replace/>
    }

    return <Outlet/>;

}
