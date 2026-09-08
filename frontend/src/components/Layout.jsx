import React, { useState } from "react";
import Navbar from "./NavBar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";



function Layout({ children }) {

    const [sidebarMinimized, setSidebarMinimized] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100">

            <div className="flex">
                <Sidebar minimized={sidebarMinimized} />
                <main className="flex-1 bg-background">
                    <Navbar sidebarMinimized={sidebarMinimized} onToggle={() => setSidebarMinimized(!sidebarMinimized)} />
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default Layout;