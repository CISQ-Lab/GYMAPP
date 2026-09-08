import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion'; 
import { SERVER_URL } from '../config/env';
import useGym from "../hooks/useGym";
import useAuth from '../hooks/useAuth.jsx';

import DashboardIcon from '../assets/icons/dashboard-icon.jsx';
import MembersIcon from '../assets/icons/members-icon.jsx';
import TrainersIcon from '../assets/icons/trainers-icon.jsx';
import PlansIcon from '../assets/icons/plans-icon.jsx';
import ProductsIcon from '../assets/icons/products-icon.jsx';
import PaymentsIcon from '../assets/icons/payments-icon.jsx';
import SettingsIcon from '../assets/icons/settings-icon.jsx';
import LogoutIcon from "../assets/icons/LogoutIcon.jsx"

// 1. Creamos el NavLink animado fuera del componente
const MotionNavLink = motion.create(NavLink);


function Sidebar({ minimized }) {

    const {gym} = useGym();
    const {logout} = useAuth();

    const MenuItems = [
        { name: "Dashboard", path: "/dashboard", icon: DashboardIcon },
        { name: "Miembros", path: "/members", icon: MembersIcon },
        { name: "Entrenadores", path: "/trainers", icon: TrainersIcon },
        { name: "Planes", path: "/plans", icon: PlansIcon },
        { name: "Productos", path: "/products", icon: ProductsIcon },
        { name: "Pagos", path: "/payments", icon: PaymentsIcon },
        { name: "Configuración", path: "/settings", icon: SettingsIcon },
        { name: "Logout", path: "", icon: LogoutIcon },
    ];

    return (
        <aside className={`h-screen bg-primary/10 text-black transition-all duration-300 ease-in-out ${minimized ? 'w-16' : 'w-48'}`}>
            <nav className="pt-4">
                
                <div className='m-3 py-5 rounded-2xl flex flex-col items-center '>
                    <img src={SERVER_URL + gym?.logo_path} alt="Gym App Logo" className={`${minimized ? "h-10 w-10" : "h-15 w-15"} border border-primary rounded-full` }/>
                    <h1>{!minimized && gym?.name}</h1>
                </div>
                
                <ul className="space-y-2 text-left px-3">
                    {MenuItems.map((item, index) => (
                        <li key={index}>
                            {/* 2. Usamos el MotionNavLink directamente */}
                            <MotionNavLink
                                to={item.path}
                                onClick={item.name === "Logout" && logout}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className={({ isActive }) => `
                                    flex items-center p-2 rounded-2xl gap-3 transition-colors duration-200 w-full
                                    ${isActive
                                        ? 'bg-primary/40 backdrop-blur-md border border-primary/50 text-primary font-medium shadow-sm'
                                        : 'text-gray-700 hover:bg-primary/10 hover:text-primary'
                                    }
                                `}
                            >
                                {/* 3. El ícono puede heredar el color del texto activo/inactivo usando currentColor si tus SVGs lo soportan */}
                                <item.icon size={24} />
                                {!minimized && <span className="truncate">{item.name}</span>}
                            </MotionNavLink>
                        </li>
                    ))}

                    
                </ul>
            </nav>
        </aside>
    );
}

export default Sidebar;
