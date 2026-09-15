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

            {/* Contenedor derecho que toma el resto del espacio y maneja el flujo */}
            <main className="flex-1 flex flex-col h-full bg-primary/2 overflow-hidden">
                
                {/* Navbar fijo arriba */}
                <Navbar 
                    sidebarMinimized={sidebarMinimized} 
                    onToggle={() => setSidebarMinimized(!sidebarMinimized)} 
                />

                {/* Contenedor de las vistas con scroll interno automático */}
                <div className="flex-1 overflow-y-auto p-10">
                    <AnimatePresence mode="wait">
                        <motion.div 
                            key={location.pathname} 
                            initial={{ opacity: 0, scale: 0.8 }} 
                            animate={{ opacity: 1, scale: 1 }} 
                            transition={{
                                duration: 0.2, 
                                scale: { type: "spring", visualDuration: 0.1, bounce: 0.1 }
                            }}
                            className="h-full"
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