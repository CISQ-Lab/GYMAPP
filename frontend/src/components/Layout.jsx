import React, { useState } from "react";
import Navbar from "./NavBar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

import { motion } from "framer-motion";



function Layout({ children }) {

    const [sidebarMinimized, setSidebarMinimized] = useState(false);

    return (
        <motion.div className="min-h-screen bg-gray-100" initial={{ opacity: 1, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.1,
                scale: { type: "spring", visualDuration: 0.3, bounce: 0.3 },
            }}>

            <div className="flex">
                <Sidebar minimized={sidebarMinimized} onToggle={() => setSidebarMinimized(!sidebarMinimized)}/>
                <main className="flex-1 bg-primary/2 p-10">
                    <Navbar sidebarMinimized={sidebarMinimized} onToggle={() => setSidebarMinimized(!sidebarMinimized)} />
                    <Outlet />
                </main>
            </div>
        </motion.div>
    );
}

export default Layout;