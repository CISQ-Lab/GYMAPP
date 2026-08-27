import { NavLink } from "react-router-dom";

export default function RegisterForm({ email, setEmail, password, setPassword, name, setName, lastName, setLastName, confirmPassword, setConfirmPassword, loading, setHidden }) {
    return (
        <>
            <h2 className="text-2xl font-bold text-center mb-5 text-white">Registrate</h2>

            <input
                className="border text-white border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 placeholder:text-gray-400"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Nombre(s)"
            />

            <input className="border text-white border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 placeholder:text-gray-400"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Apellido(s)"
            />

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

            <input
                className="border text-white border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 placeholder:text-gray-400"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirma tu contraseña"
            />

            <button
                className="cursor-pointer bg-red-700/80 hover:bg-red-900  text-white font-semibold p-3 rounded-lg transition-colors"
                type="submit"
            >
                {loading ? "Cargando..." : "Registrarse"}
            </button>
            <button
                className="cursor-pointer border border-red-700 bg-red-100/10 hover:bg-red-300/10 text-white font-semibold p-3 rounded-lg transition-colors"
                type="button" onClick={() => setHidden(false)}
            >
                Iniciar Sesión
            </button>
        </>
    )
}