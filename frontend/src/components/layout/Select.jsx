export default function Select({ items = [], value, onChange, name, placeholder = "-- Selecciona una opción --" }) {
    return (
        <select 
            className="border border-white py-2 px-5 w-4/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary" 
            name={name} 
            value={value} 
            onChange={onChange}
            required
        >
            {/* Opción por defecto deshabilitada */}
            <option value="" disabled selected>
                {items?.length === 0 ? "-- No Hay Opciones Disponibles --" : placeholder}
            </option>

            {/* Mapeo seguro de los items */}
            {items?.map((item) => (
                <option key={item.id} value={item.id}> 
                    {item.name} - ${item.price} 
                </option>
            ))}
        </select>
    );
}