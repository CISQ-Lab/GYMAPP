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

function AppRoutes() {

    return (
        <Routes >

            <Route path="/" element={<Login/>}/>

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

        </Routes>
    )

}

export default AppRoutes;
