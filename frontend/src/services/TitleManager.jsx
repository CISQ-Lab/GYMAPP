import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { APP_NAME } from "../config/env";

export default function TitleManager({children}) {
    const location = useLocation();

    useEffect(() => {
        // Mapa de rutas con sus respectivos títulos
        const routeTitles = {
            "/": "Login",
            "/Dashboard": "Dashboard",
            "/plans": "Gestión de Planes",
            "/members": "Miembros",
            "/settings": "Configuración",
            // Agrega aquí todas tus rutas futuras...
        };

        // Busca el título según la ruta actual; si no existe ninguna, usa "GymApp"
        const currentTitle = routeTitles[location.pathname] || APP_NAME;

        document.title = `${currentTitle} | ${APP_NAME}`;
    }, [location]);

    return children;


}