import { useState } from "react";
import Navbar from "./NavBar";
import Sidebar from "./Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

function Layout() {
    const [sidebarMinimized, setSidebarMinimized] = useState(false);
    const location = useLocation();

    return (
        <motion.div
            className="h-screen w-screen overflow-hidden bg-gray-100 flex"
            initial={{ opacity: 1, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
                duration: 0.1,
                scale: { type: "spring", visualDuration: 0.3, bounce: 0.3 },
            }}
        >
            {/* Sidebar fijo a la altura de la pantalla */}
            <Sidebar
                minimized={sidebarMinimized}
                onToggle={() => setSidebarMinimized(!sidebarMinimized)}
            />

                <main className="flex-1 flex flex-col h-full bg-primary/2 overflow-y-auto">
                    {/* Navbar (opcional: puedes dejarlo fijo arriba con sticky si quieres) */}
                    <Navbar sidebarMinimized={sidebarMinimized} onToggle={() => setSidebarMinimized(!sidebarMinimized)} />

                    {/* Contenedor de vistas: ya NO lleva h-full estricto si el form es muy largo */}
                    <div className="p-10 flex-1">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={location.pathname}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.2 }}
                                /* Quitamos el h-full de aquí para que crezca libremente según el contenido */
                                className="w-full justify-center"
                            >
                                <Outlet />
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </main>
        </motion.div>
    );
}

export default Layout;