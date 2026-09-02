import useAuth from "../hooks/useAuth";
import Spinner from "../components/spinner";

import { Navigate, Outlet } from "react-router-dom";

export default function userFirstGym(){
    const {user, authenticated, loading} = useAuth();

    if(loading){
        return <Spinner/>
    }

    if(!authenticated){
        return <Navigate to={"/"} replace/>
    }

    if(user.hasGym){
        return <Navigate to={"/dashboard"} replace/>
    }

    return <Outlet/>;
} 