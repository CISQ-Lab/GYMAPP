import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { SERVER_URL } from '../../config/env.js';
import useGym from "../../hooks/useGym.jsx";
import useAuth from '../../hooks/useAuth.jsx';

import DashboardIcon from '../../assets/icons/dashboard-icon.jsx';
import MembersIcon from '../../assets/icons/members-icon.jsx';
import TrainersIcon from '../../assets/icons/trainers-icon.jsx';
import PlansIcon from '../../assets/icons/plans-icon.jsx';
import ProductsIcon from '../../assets/icons/products-icon.jsx';
import PaymentsIcon from '../../assets/icons/payments-icon.jsx';
import SettingsIcon from '../../assets/icons/settings-icon.jsx';
import LogoutIcon from "../../assets/icons/LogoutIcon.jsx"

function Sidebar({ minimized, onToggle }) {

    const { gym } = useGym();
    const { logout } = useAuth();

    const MenuItems = [
        { name: "Dashboard", path: "/dashboard", icon: DashboardIcon },
        { name: "Miembros", path: "/members", icon: MembersIcon },
        { name: "Entrenadores", path: "/trainers", icon: TrainersIcon },
        { name: "Planes", path: "/plans", icon: PlansIcon },
        { name: "Productos", path: "/products", icon: ProductsIcon },
        { name: "Pagos", path: "/payments", icon: PaymentsIcon },
        { name: "Configuración", path: "/settings", icon: SettingsIcon },
    ];

    return (
        <aside className={`h-screen bg-primary/10 text-black transition-all duration-300 ease-in-out ${minimized ? 'w-16' : 'w-48'}`}>
            <nav className="pt-4 h-full flex flex-col">

                <div className='m-3 rounded-2xl flex flex-col items-center '>
                    <img src={SERVER_URL + gym?.logo_path} alt="Gym App Logo" className={`${minimized ? "h-10 w-10" : "h-25 w-25"} border border-primary rounded-full`} />
                    <h1>{!minimized && gym?.name}</h1>
                </div>

                <ul className="space-y-2 text-left px-3 flex flex-col flex-1">
                    <li>
                        <motion.button onClick={onToggle} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                            className="flex items-center p-2 rounded-2xl gap-3 transition-colors duration-200 w-full cursor-pointer text-gray-700 hover:bg-primary/10 hover:text-primary ">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24"
                                viewBox="0 0 24 24" width="24" fill="currentColor">
                                <path d="M20 5H4a1 1 0 000 2h16a1 1 0 100-2Zm0 6H4a1 1 0 000 2h16a1 1 0 000-2Zm0 6H4a1 1 0 000 2h16a1 1 0 000-2Z"></path>
                            </svg>
                            {!minimized && <span className="truncate">Contraer</span>}
                        </motion.button>
                    </li>
                    {MenuItems.map((item) => (
                        <motion.li key={item.path} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.8 }} className="w-full">
                            <NavLink to={item.path} className={({ isActive }) => ` flex items-center p-2 rounded-2xl gap-3 transition-colors duration-200 w-full
                                ${isActive ? 'bg-primary/40 backdrop-blur-md border border-primary/50 text-primary font-medium shadow-sm'
                                    : 'text-gray-700 hover:bg-primary/10 hover:text-primary'}`}>
                                <item.icon size={24} />
                                {!minimized && <span className="truncate">{item.name}</span>}
                            </NavLink>
                        </motion.li>
                    ))}

                    <li className="mt-auto mb-3">
                        <motion.button
                            onClick={logout}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex items-center p-2 rounded-2xl gap-3 transition-colors cursor-pointer duration-200 w-full text-gray-700 hover:bg-primary/10 hover:text-primary"
                        >
                            <LogoutIcon size={24} />
                            {!minimized && <span className="truncate">Logout</span>}
                        </motion.button>
                    </li>

                </ul>

            </nav>
        </aside>
    );
}

export default Sidebar;
