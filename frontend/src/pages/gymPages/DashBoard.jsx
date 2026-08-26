import StatCard from "../../components/cards/StatCard";
import LogCard from "../../components/cards/logCard";
import ClockIcon from "../../assets/icons/ClockIcon";
import useAuth from "../../hooks/useAuth";

function Dashboard() {

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

    const { user } = useAuth();

    const ahora = new Date();
    // Configura las opciones para el formato de fecha
    const opcionesFecha = { day: 'numeric', month: 'long' };
    const formateadorFecha = new Intl.DateTimeFormat('es-ES', opcionesFecha);
    let fechaParte = formateadorFecha.format(ahora);

    // Capitaliza la primera letra del mes (JavaScript por defecto la devuelve en minúscula)
    fechaParte = fechaParte.replace(/(\d+\s+de\s+)([a-z])/, (match, p1, p2) => p1 + p2.toUpperCase());

    // Configura las opciones para el formato de hora de 12 horas con AM/PM
    const opcionesHora = { hour: '2-digit', minute: '2-digit', hour12: true };
    const formateadorHora = new Intl.DateTimeFormat('en-US', opcionesHora); // 'en-US' fuerza el formato A.M./P.M.
    const horaParte = formateadorHora.format(ahora);

    // Une ambas partes con el guion
    const resultadoFinal = `${fechaParte} - ${horaParte}`;

    console.log(resultadoFinal);

    return (
        <>

            <div className="flex justify-between items-center pb-2 font-normal text-gray-950">

                <h2 className="text-2xl ">Bienvenido, {user.name}!</h2>
                <div className="flex items-center space-x-2">
                    <ClockIcon />
                    <p className="ml-2 ">{resultadoFinal}</p>
                </div>

            </div>



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


    );
}

export default Dashboard;