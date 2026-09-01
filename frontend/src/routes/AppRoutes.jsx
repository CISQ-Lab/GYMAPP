import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/gymPages/Dashboard";
import Members from "../pages/gymPages/Members";
import Trainers from "../pages/gymPages/Trainers";
import Plans from "../pages/gymPages/Plans";
import Products from "../pages/gymPages/Products";
import Payments from "../pages/gymPages/Payments";
import Settings from "../pages/gymPages/Settings";
import Layout from "../components/Layout";
import SetTheme from "../pages/gymPages/SetTheme";
import Login from "../pages/auth/Login";
import ProtectedRoutes from "../services/ProtectedRoutes";
import GuestRoutes from "../services/GuestRoutes";
import CreateNewGym from "../pages/auth/createNewGym";

function AppRoutes() {

    return (
        <Routes >

            <Route element={<GuestRoutes />}>
                <Route path="/" element={<Login />} />
            </Route>

            <Route path="/createNewGym" element={<CreateNewGym/>}/>
            <Route element={<ProtectedRoutes />}>

                

                <Route element={<Layout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/members" element={<Members />} />
                    <Route path="/trainers" element={<Trainers />} />
                    <Route path="/plans" element={<Plans />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/payments" element={<Payments />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/settings/theme" element={<SetTheme />} />

                </Route>

            </Route>



        </Routes>
    )

}

export default AppRoutes;
