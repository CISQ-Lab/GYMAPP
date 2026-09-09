import { useState } from "react";
import Navbar from "./NavBar";
import Sidebar from "./Sidebar";
import { Outlet, useLocation } from "react-router-dom";

import { AnimatePresence, motion } from "framer-motion";



function Layout({ children }) {

    const [sidebarMinimized, setSidebarMinimized] = useState(false);
    const location = useLocation();

    return (
        <motion.div className="min-h-screen bg-gray-100" initial={{ opacity: 1, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.1,
                scale: { type: "spring", visualDuration: 0.3, bounce: 0.3 },
            }}>

            <div className="flex" >
                <Sidebar minimized={sidebarMinimized} onToggle={() => setSidebarMinimized(!sidebarMinimized)} />
                <main className="flex-1 bg-primary/2 p-10 ">
                    <Navbar sidebarMinimized={sidebarMinimized} onToggle={() => setSidebarMinimized(!sidebarMinimized)} />
                    <AnimatePresence mode="wait">
                        <motion.div key={location.pathname} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{
                            duration: 0.2, scale: { type: "spring", visualDuration: 0.1, bounce: 0.1 }}}>
                            <Outlet />
                        </motion.div>
                    </AnimatePresence>

                </main>
            </div>
        </motion.div>
    );
}

export default Layout;