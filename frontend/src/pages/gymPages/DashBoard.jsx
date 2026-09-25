import StatCard from "../../components/cards/StatCard";
import LogCard from "../../components/cards/logCard";
import useAuth from "../../hooks/useAuth";
import useGym from "../../hooks/useGym"
import Button from "../../components/buttons/button";
import { useState } from "react";
import { apiFetch } from "../../services/api";
import Success from "../../components/messages/success";
import showError from "../../components/messages/showError.js"
import useCD from "../../hooks/useCD.jsx"

function Dashboard() {

    const { gym } = useGym();
    const { user } = useAuth();
    const { cashDrawer } = useCD();

    console.log(cashDrawer);

    const stats = [
        { title: "Asistencias", value: "30" },
        { title: "Miembros a punto de vencer", value: "10" },
        { title: "Ventas hoy", value: "$1000" },
        { title: "Ventas del mes", value: "$5000" }
    ];

    const logs = [
        { title: "Miembro agregado", value: "Juan Perez" },
        { title: "Pago recibido", value: "$50" },
        { title: "Miembro eliminado", value: "Maria Lopez" },
        { title: "Nuevo plan creado", value: "Plan Premium" }
    ];

    const recent = [
        { title: "Ingreso", value: "Juan Perez" },
        { title: "Ingreso", value: "Ana García" },
        { title: "Salida", value: "Maria Lopez" },
        { title: "Salida", value: "Pedro Ramírez" }

    ];



    return (
        <>

            <div className="flex justify-between items-center pb-2 font-normal text-gray-950">

                <h2 className="text-2xl ">Bienvenido, {user?.name}!</h2>

            </div>

            {!cashDrawer ? <p>Abre una caja para comenzar el dia</p> :

                <>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 ">

                        {
                            stats.map((stat, index) => (
                                <StatCard key={index} title={stat.title} value={stat.value} />
                            ))
                        }

                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <LogCard title="Actividades Recientes" log={recent} />
                        <LogCard title="Registros del Día" log={logs} />
                    </div>

                </>

            }



        </>


    );
}

export default Dashboard;