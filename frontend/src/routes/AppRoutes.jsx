import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/gymPages/DashBoard";
import Members from "../pages/gymPages/Members";
import Trainers from "../pages/gymPages/Trainers";
import Plans from "../pages/gymPages/Plans";
import Products from "../pages/gymPages/Products";
import Payments from "../pages/gymPages/Payments";
import Settings from "../pages/gymPages/Settings";
import Layout from "../components/layout/Layout";
import SetTheme from "../pages/gymPages/SetTheme";
import Login from "../pages/auth/Login";
import ProtectedRoutes from "../services/ProtectedRoutes";
import GuestRoutes from "../services/GuestRoutes";
import UserFirstGym from "../services/userFirstGym";
import CreateNewGym from "../pages/auth/createNewGym";
import AddNewPlan from "../pages/gymPages/AddNewPlan";
import EditPlan from "../pages/gymPages/EditPlan";
import AddNewMember from "../pages/gymPages/AddNewMember";
import ViewMember from "../pages/gymPages/ViewMember"
import CloseTurn from "../pages/gymPages/CloseTurn";
import CDProtectedRoutes from "../services/CDProtectedRoutes";
import NotFound from "../pages/gymPages/NotFound";

function AppRoutes() {

    return (
        <Routes >

            <Route element={<UserFirstGym />}>
                <Route path="/createNewGym" element={<CreateNewGym />} />
            </Route>

            <Route element={<GuestRoutes />}>
                <Route path="/" element={<Login />} />
            </Route>

            <Route element={<ProtectedRoutes />}>
                <Route element={<Layout />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/members" element={<Members />} />
                    <Route path="/trainers" element={<Trainers />} />
                    <Route path="/plans" element={<Plans />} />
                    <Route path="/plans/addplan" element={<AddNewPlan />} />
                    <Route path="/products" element={<Products />} />
                    <Route path="/payments" element={<Payments />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/settings/theme" element={<SetTheme />} />
                    <Route path="/closeturn" element={<CloseTurn />} />

                    <Route element={<CDProtectedRoutes />}>
                        <Route path="/members/viewmember" element={<ViewMember />} />
                        <Route path="/members/addMember" element={<AddNewMember />} />
                        <Route path="/members/editMember" element={<EditPlan />} />
                        <Route path="/plans/editplan" element={<EditPlan />} />
                    </Route>

                </Route>

            </Route>

            <Route path="*" element={<NotFound />} />



        </Routes>
    )

}

export default AppRoutes;
