import StatCard from "../../components/cards/StatCard";
import LogCard from "../../components/cards/LogCard";
import useAuth from "../../hooks/useAuth";
import useGym from "../../hooks/useGym";
import useCD from "../../hooks/useCD.jsx";
import { apiFetch } from "../../services/api.jsx";
import { useState, useEffect } from "react";
import Spinner from "../../components/layout/Spinner.jsx";
import Button from "../../components/buttons/Button.jsx"
import { NavLink } from "react-router-dom";

function Dashboard() {
    const { gym } = useGym();
    const { user } = useAuth();
    const { cashDrawer, loading } = useCD();

    const [numAssistances, setNumAssistances] = useState(0);
    const [logAssistances, setLogAssistances] = useState([]);
    const [cashToday, setCashToday] = useState(0);
    const [cashMonthly, setCashMonthly] = useState(0);
    const [transactions, setTransactions] = useState([]);
    const [membersToFinish, setMembersToFinsh] = useState(0);

    const getNumAssistances = async (gymId) => {
        const data = await apiFetch(`/members/attendancestoday?type=count&gymId=${gymId}`);
        if (data.success) {
            setNumAssistances(data.num);
        }
    };

    const getLogAssistances = async (gymId) => {
        const data = await apiFetch(`/members/attendancestoday?type=log&gymId=${gymId}`);
        if (data.success) {
            setLogAssistances(data.attendances);
        } else {
            setLogAssistances([]);
        }
    };

    const getCashMonthly = async (gymId) => {

        const data = await apiFetch(`/cashdrawer/getmonthlycash/${gymId}`);
        if (data.success) {
            setCashMonthly(data.amount)
        }

    }

    const getTransactionsToday = async (gymId) => {
        const data = await apiFetch(`/cashdrawer/gettransactionstoday/${gymId}`);
        if (data.success) {
            setTransactions(data.transactions)
        }
    }

    const getMembersToFinish = async (gymId) => {
        const data = await apiFetch(`/members/getstats/${gymId}`);
        if (data.success) {
            setMembersToFinsh(data.stats.toFinish);
        }
    }

    useEffect(() => {
        setCashToday(cashDrawer?.ending_cash_expected);
        getCashMonthly(gym?.id);
    }, [cashDrawer?.ending_cash_expected])

    useEffect(() => {

        if (!gym?.id && !cashDrawer) {
            return;
        }
        getNumAssistances(gym?.id);
        getLogAssistances(gym?.id);
        getCashMonthly(gym?.id);
        getTransactionsToday(gym?.id);
        getMembersToFinish(gym?.id);

    }, [gym?.id, cashDrawer]);

    const stats = [
        { title: "Asistencias de hoy", value: numAssistances },
        { title: "Miembros a punto de vencer", value: membersToFinish },
        { title: "Ventas hoy", value: "$" + cashToday },
        { title: "Ventas del mes", value: "$" + cashMonthly }
    ];


    if (loading) {
        return (<Spinner isLoading={loading} />)
    }
    return (
        <>

            <div className="pb-8">
                {/* Encabezado del Dashboard */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-gray-100 pb-4">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                            Bienvenido, {user?.name}! 👋
                        </h2>
                        <p className="text-sm text-gray-500 mt-0.5">
                            Aquí tienes el resumen de la actividad para <span className="font-medium text-gray-700">{gym?.name || 'tu gimnasio'}</span>.
                        </p>
                    </div>

                    <div className="space-x-3">
                        <NavLink to="/members/addMember">
                            <Button>Agregar Miembro</Button>
                        </NavLink>

                        <NavLink to="/members">
                            <Button>Registrar Asistencia</Button>
                        </NavLink>
                    </div>
                </div>

                {/* Alerta si la caja está cerrada */}
                {!cashDrawer ? (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-5 flex items-center space-x-4 text-amber-800">
                        <div className="p-2 bg-amber-100 rounded-lg">
                            ⚠️
                        </div>
                        <div>
                            <h4 className="font-semibold text-sm">Caja cerrada</h4>
                            <p className="text-xs text-amber-700 mt-0.5">Debes abrir una caja para comenzar el día y habilitar las operaciones de venta.</p>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Tarjetas de Estadísticas */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {stats.map((stat, index) => (
                                <StatCard key={index} title={stat.title} value={stat.value} />
                            ))}
                        </div>

                        {/* Secciones de Registros y Actividad */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <LogCard title="Actividades Recientes">
                                {logAssistances && logAssistances.length > 0 ? (
                                    <div className="divide-y divide-gray-100">
                                        {logAssistances.map((item, index) => {
                                            const isValid = item.status === "valida";
                                            return (
                                                <div key={index} className="flex items-center justify-between py-2">
                                                    <div className="flex flex-col">
                                                        <span className="font-medium text-gray-900 text-sm">
                                                            {item.name} {item.surname}
                                                        </span>
                                                        <span className="text-xs text-gray-400 mt-0.5">
                                                            {item.time}
                                                        </span>
                                                    </div>
                                                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide ${isValid
                                                        ? "bg-emerald-50 text-emerald-600 border border-emerald-100"
                                                        : "bg-rose-50 text-rose-600 border border-rose-100"
                                                        }`}>
                                                        {item.status}
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <p className="text-gray-400 text-sm py-8 text-center">
                                        No hay registros de asistencias hoy
                                    </p>
                                )}
                            </LogCard>

                            <LogCard title="Transacciones del Día">
                                {transactions && transactions.length > 0 ? (
                                    <div className="divide-y divide-gray-100">
                                        {transactions.map((item, index) => {
                                            const isIngreso = item.type === "ingreso";
                                            return (
                                                <div key={index} className="flex items-center justify-between py-2">
                                                    {/* Concepto y Hora */}
                                                    <div className="flex flex-col pr-4">
                                                        <span className="font-medium text-gray-900 text-sm line-clamp-1">
                                                            {item.concept}
                                                        </span>
                                                        <span className="text-xs text-gray-400 mt-0.5">
                                                            {item.CREATED_AT}
                                                        </span>
                                                    </div>

                                                    {/* Monto y Tipo (Ingreso / Egreso) */}
                                                    <div className="flex items-center gap-3 shrink-0">
                                                        <span className={`text-sm font-bold ${isIngreso ? "text-emerald-600" : "text-rose-600"
                                                            }`}>
                                                            {isIngreso ? "+" : "-"}${Number(item.amount).toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                                                        </span>

                                                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide border ${isIngreso
                                                            ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                                                            : "bg-rose-50 text-rose-600 border-rose-100"
                                                            }`}>
                                                            {item.type}
                                                        </span>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ) : (
                                    <p className="text-gray-400 text-sm py-8 text-center">
                                        No hay transacciones registradas hoy
                                    </p>
                                )}
                            </LogCard>
                        </div>
                    </>
                )}
            </div>




        </>
    );
}

export default Dashboard;