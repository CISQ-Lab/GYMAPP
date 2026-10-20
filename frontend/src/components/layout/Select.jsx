import { Children } from "react";

export default function Select({ items = [], value, onChange, name, placeholder = "-- Selecciona una opción --", children }) {
    return (
        <select 
            className="border border-black py-2 px-5 w-4/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary" 
            name={name} 
            value={value} 
            onChange={onChange}
            required
        >
            {/* Opción por defecto deshabilitada */}
            <option value="" disabled selected>
                {(items?.length === 0 || !placeholder) ? "-- No Hay Opciones Disponibles --" : placeholder}
            </option>

            {children}
        </select>
    );
}