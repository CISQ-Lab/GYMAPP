import StatCard from "../../components/cards/StatCard";
import Button from "../../components/buttons/button";
import { NavLink } from "react-router-dom";

function Members() {

    const stats = [
        { title: "Miembros", value: "150" },
        { title: "Entrenadores", value: "10" },
        { title: "Planes", value: "5" },
        { title: "Productos", value: "20" },
        { title: "Pagos del mes", value: "$5000" }
    ];

    return (
        <>
            <div className="flex justify-between items-center mb-2">
                <h1>Miembros</h1>
                <NavLink to="./addMember">
                    <Button>+ Agregar nuevo miembro</Button>
                </NavLink>
                
            </div>


            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

                {
                    stats.map((stat, index) => (
                        <StatCard key={index} title={stat.title} value={stat.value} />
                    ))
                }

            </div>

            <form action=""></form>

        </>


    );
}

export default Members;