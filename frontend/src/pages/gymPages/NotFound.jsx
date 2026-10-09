import { NavLink } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
            <div className="bg-primary/10 p-4 rounded-2xl mb-4">
                <span className="text-4xl">🚧</span>
            </div>
            <h1 className="text-6xl font-extrabold text-gray-900 tracking-tight mb-2">404</h1>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Página no encontrada</h2>
            <p className="text-sm text-gray-500 max-w-md mb-6">
                Lo sentimos, la ruta que buscas no existe o ha sido movida. Verifica la URL o regresa al panel principal.
            </p>

            <NavLink
                to="/"
                className="px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-medium shadow-sm hover:opacity-90 transition-opacity"
            >
                Volver al Dashboard
            </NavLink>
        </div>
    );
}