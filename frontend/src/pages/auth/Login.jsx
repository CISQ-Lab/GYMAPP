import { useState } from "react"
import useAuth from "../../hooks/useAuth"
import Swal from "sweetalert2"
import bg from "../../assets/fondoLogin.jpg"
import NavbarPublic from "../../components/NavBarPublic"
import { NavLink } from 'react-router-dom';
import { APP_NAME } from "../../config/env"

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login, loading, user, logout } = useAuth();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
        }
        catch (error) {
            Swal.fire({
                title: 'Error!',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'Okey'
            })
        }

    }

    return (
        <div className="flex flex-col min-h-screen bg-cover bg-center bg-no-repeat overflow-hidden " style={{ backgroundImage: `url(${bg})` }}>
            <div className="absolute inset-0 bg-black/60" />
            <NavbarPublic />
            <main className="relative flex-1  flex items-center justify-center ">

                <div className="relative z-10 bg-red-400/10 p-8 rounded-xl shadow-2xl w-full max-w-md backdrop-blur-sm  ">
                    <form onSubmit={handleSubmit} id="login">
                        <div className="flex flex-col space-y-4">
                            <h2 className="text-2xl font-bold text-center mb-5 text-white">Iniciar Sesión</h2>

                            <input
                                className="border text-white border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 placeholder:text-gray-400"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Correo electrónico"
                            />

                            <input
                                className="border text-white border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 placeholder:text-gray-400"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Contraseña"
                            />

                            <p className="text-white text-center text-sm">¿Olvidaste tu contraseña? <NavLink className="text-red-300 hover:underline">Reestablecela aqui!</NavLink></p>

                            <button
                                className="cursor-pointer bg-red-700/80 hover:bg-red-900  text-white font-semibold p-3 rounded-lg transition-colors"
                                type="submit"
                            >
                                {loading ? "Cargando..." : "Iniciar Sesión"}
                            </button>
                            <button
                                className="cursor-pointer border border-red-700 bg-red-100/10 hover:bg-red-300/10 text-white font-semibold p-3 rounded-lg transition-colors"
                                type="button"
                            >
                                Registrarse
                            </button>
                        </div>
                    </form>
                </div>
            </main>

            <footer className="p-3 bg-red-900/20 text-white backdrop-blur-xs flex justify-around items-center space-x-4">
                <p>© 2024 {APP_NAME}. Todos los derechos reservados.</p>
                <p>Hecho con ❤️ por CISQ-Lab</p>
                <NavLink to="/contact" className="text-blue-400 hover:underline">Contáctanos</NavLink>

            </footer>

        </div>
    );
}