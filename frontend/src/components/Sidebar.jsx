function Sidebar() {

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
        <aside className="w-64 h-screen bg-gray-800 text-white p-4">
            <nav >
                <ul className="space-y-4">
                    {MenuItems.map((item, index) => (
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