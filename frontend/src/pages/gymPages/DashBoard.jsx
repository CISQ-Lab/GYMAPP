import StatCard from "../../components/cards/StatCard";

function Dashboard() {

    const stats = [
        { title: "Miembros", value: "150" },
        { title: "Entrenadores", value: "10" },
        { title: "Planes", value: "5" },
        { title: "Productos", value: "20" },
        { title: "Pagos del mes", value: "$5000" }
    ];

    return (
        <>
            <h1>Dashboard</h1>
            <h2>Bienvenido, Christian!</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

                {
                    stats.map((stat, index) => (
                        <StatCard key={index} title={stat.title} value={stat.value} />
                    ))
                }

            </div>

        </>


    );
}

export default Dashboard;