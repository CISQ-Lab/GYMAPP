import React, { useState } from "react";
import Navbar from "./NavBar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";



function Layout({ children }) {

    const [sidebarMinimized, setSidebarMinimized] = useState(false);

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar sidebarMinimized={sidebarMinimized} onToggle={() => setSidebarMinimized(!sidebarMinimized)} />
            <div className="flex">
                <Sidebar minimized={sidebarMinimized} />
                <main className="flex-1 p-6 bg-background">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}

export default Layout;