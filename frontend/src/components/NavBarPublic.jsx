import Logo from "../assets/icons/logo";
import { NavLink } from 'react-router-dom';
import { APP_NAME } from "../config/env";

export default function NavBarPublic() {

    return (
        <nav className={`flex justify-between items-center p-5 bg-red-900/40 backdrop-blur-xs text-white h-15 `}>
            <div className="flex items-center space-x-3">


                <div className={`flex items-center ml-5`}>
                    <Logo />
                    <h1 className='ml-3 text-center'>{APP_NAME}</h1>
                </div>

            </div>

            <ul className="flex space-x-4">
                <li><NavLink to="/" className="text-lg text-blue-400 hover:underline">Conoce nuestra app!</NavLink></li>
            </ul>

        </nav>

    )
}