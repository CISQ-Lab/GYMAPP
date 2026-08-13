function Sidebar({minimized, onToggle}) {

    const MenuItems = [
        "Dashboard",
        "Miembros",
        "Entrenadores",
        "Planes",
        "Productos",
        "Pagos",
        "Configuración"
    ]

    return (
        <aside className={`h-screen bg-gray-800 text-white p-4 transition-all duration-300 ease-in-out ${minimized ? 'w-20' : 'w-64'}`}>
            <nav >
                <button onClick={onToggle}>
                    {minimized ? "Expandir" : "Contraer"}
                </button>
                <ul className="space-y-4">
                    {minimized ? <p>GYM</p> : MenuItems.map((item, index) => (
                        <li key={index}>
                            <a href={`/${item.toLowerCase()}`}
                            className="block px-4 py-2 rounded hover:bg-gray-700">
                                {item}
                            </a>
                        </li>
                    ))}
                </ul>
            </nav>
        </aside>
    );
}

export default Sidebar;