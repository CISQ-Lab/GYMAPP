import { NavLink } from "react-router-dom";

export default function LoginForm({ email, setEmail, password, setPassword, loading , setHidden}) {
    return (
        <>
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

            <div className="flex flex-col items-center justify-center space-y-1 mb-4 text-sm sm:flex-row sm:space-x-1 sm:space-y-0 sm:text-base">
                <p className="text-white ">¿Olvidaste tu contraseña?</p> <NavLink className=" text-red-300 hover:underline ">Reestablecela aqui!</NavLink>
            </div>
            

            <button
                className="cursor-pointer bg-red-700/80 hover:bg-red-900  text-white font-semibold p-3 rounded-lg transition-colors"
                type="submit"
            >
                {loading ? "Cargando..." : "Iniciar Sesión"}
            </button>
            <button
                className="cursor-pointer border border-red-700 bg-red-100/10 hover:bg-red-300/10 text-white font-semibold p-3 rounded-lg transition-colors"
                type="button" onClick={() => setHidden(true)}
            >
                Registrarse
            </button>
        </>
    );
}