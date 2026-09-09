import StatCard from "../../components/cards/StatCard";
import Button from "../../components/buttons/button";
import FormAdd from "../../components/forms/formAdd";
import { NavLink } from "react-router-dom";

function Plans() {

    const stats = [
        { title: "Miembros", value: "150" },
        { title: "Entrenadores", value: "10" },
        { title: "Planes", value: "5" },
        { title: "Productos", value: "20" },
    ];

    return (
        <>
            <div className="flex justify-between items-center mb-2">
                <h1>Planes del gimnasio</h1>
                <NavLink to="/plans/addplan">
                    <Button>
                        + Agregar nuevo plan
                    </Button>
                </NavLink>
            </div>

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

export default Plans;