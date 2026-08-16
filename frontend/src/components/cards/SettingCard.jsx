import settingsIcon from "../../assets/icons/settings-icon.jsx";
import { NavLink } from "react-router-dom";

export default function SettingCard({ title, description, icon = settingsIcon, path = "/settings" }) {

    return (
        <NavLink to={path}>

            <div className="flex flex-col justify-between bg-white shadow-md rounded p-4 m-2 text-gray-800 hover:bg-gray-300 transition-shadow duration-300">
                {icon}
                <h3 className="text-l font-semibold">{title}</h3>
                <p className="text-xs text-gray-900">{description}</p>
            </div>

        </NavLink>

    );
}