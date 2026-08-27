import bg from "../assets/fondoLogin.jpg"
import NavbarPublic from "../components/NavBarPublic"
import { NavLink } from 'react-router-dom';
import { APP_NAME } from "../config/env"
import Spinner from "../components/spinner"
const year = new Date().getFullYear();

export default function LayoutPublic({ children }) {
    return (


        <div className="flex flex-col min-h-screen bg-cover bg-center bg-no-repeat overflow-hidden " style={{ backgroundImage: `url(${bg})` }}>
            <Spinner />
            <div className="absolute inset-0 bg-black/60" />
            <NavbarPublic />
            <main className="relative flex-1 flex items-center justify-center ">

                {children}

            </main>
            <footer className="p-3 bg-red-900/20 text-white backdrop-blur-xs flex justify-between items-center px-4 pb-20 sm:px-15 sm:pb-5">
                <div>
                    <p className="text-xs sm:text-lg">©{year} {APP_NAME} Todos los derechos reservados.</p>
                    <p className="text-xs sm:text-lg">Hecho con ❤️ por CISQ-Lab</p>
                </div>

                <NavLink to="/contact" className="text-blue-400 hover:underline text-xs sm:text-lg">Contáctanos</NavLink>

            </footer>

        </div>
    );
}