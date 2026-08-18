import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import DashboardIcon from '../assets/icons/dashboard-icon.jsx';
import MembersIcon from '../assets/icons/members-icon.jsx';
import TrainersIcon from '../assets/icons/trainers-icon.jsx';
import PlansIcon from '../assets/icons/plans-icon.jsx';
import ProductsIcon from '../assets/icons/products-icon.jsx';
import PaymentsIcon from '../assets/icons/payments-icon.jsx';
import SettingsIcon from '../assets/icons/settings-icon.jsx';

function Sidebar({ minimized }) {

    const MenuItems = [
        {
            name: "Dashboard",
            path: "/dashboard",
            icon: DashboardIcon
        },
        {
            name: "Miembros",
            path: "/members",
            icon: MembersIcon
        },
        {
            name: "Entrenadores",
            path: "/trainers",
            icon: TrainersIcon
        },
        {
            name: "Planes",
            path: "/plans",
            icon: PlansIcon
        },
        {
            name: "Productos",
            path: "/products",
            icon: ProductsIcon
        },
        {
            name: "Pagos",
            path: "/payments",
            icon: PaymentsIcon
        },
        {
            name: "Configuración",
            path: "/settings",
            icon: SettingsIcon
        }
    ]

    return (


        <aside className={`h-screen bg-primary text-white transition-all duration-300 ease-in-out ${minimized ? 'w-15' : 'w-48'}`}>
            <nav >
                <ul className="space-y-4 text-left px-3">

                    {MenuItems.map((item, index) => (
                        <li key={index}>
                            <NavLink to={item.path} className={({ isActive }) => `flex items-center p-2 rounded space-x-2 hover:bg-gray-700 ${isActive ? 'bg-gray-600' : ''}`}>
                                <item.icon size={24} color="white" />
                                {minimized ? null : <span>{item.name}</span>}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}

export default Sidebar;