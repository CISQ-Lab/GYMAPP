import StatCard from "../../components/cards/StatCard";
import SettingCard from "../../components/cards/SettingCard";

function Settings() {

    const settings = [
        { title: "Tema", description: "Configura el tema de tu gimnasio", path: "./theme" },
        { title: "Miembros", description: "Gestiona los miembros de tu gimnasio" },
        { title: "Entrenadores", description: "Administra los entrenadores" },
        { title: "Planes", description: "Crea y gestiona planes de entrenamiento" },
        { title: "Productos", description: "Administra los productos disponibles" },
        { title: "Pagos del mes", description: "Revisa los pagos del mes" }
    ];

    return (
        <>
            <h1 className="text-gray-950">Settings</h1>
            
            {settings.map((setting, index) => (
                <SettingCard key={index} title={setting.title} description={setting.description} path={setting.path} />
            ))}

        </>


    );
}

export default Settings;