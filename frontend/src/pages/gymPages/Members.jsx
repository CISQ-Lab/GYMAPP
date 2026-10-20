import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import Button from "../../components/buttons/Button";
import Membercard from "../../components/cards/MemberCard";
import StatCard from "../../components/cards/StatCard";
import Spinner from "../../components/layout/Spinner";
import showError from "../../components/messages/showError";
import useGym from "../../hooks/useGym";
import { apiFetch } from "../../services/api";

function Members() {
    const { gym } = useGym();
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Estado unificado para las estadísticas
    const [statsData, setStatsData] = useState({
        all: 0,
        toFinish: 0,
        finished: 0,
        newsAtMonth: 0
    });

    const [wordSearch, setWordSearch] = useState("");

    useEffect(() => {
        if (!gym?.id) return;

        const fetchData = async () => {
            setLoading(true);
            try {
                // Ejecutamos ambas peticiones en paralelo para mayor velocidad
                const [statsRes, membersRes] = await Promise.all([
                    apiFetch(`/members/getStats/${gym.id}`),
                    apiFetch(`/members/getrecently/${gym.id}`)
                ]);

                if (statsRes.success && statsRes.stats) {
                    setStatsData({
                        total: statsRes.stats.total || 0,
                        toFinish: statsRes.stats.toFinish || 0,
                        finished: statsRes.stats.finished || 0,
                        newsAtMonth: statsRes.stats.newsAtMonth || 0
                    });
                }

                if (membersRes.success && membersRes.members) {
                    setMembers(membersRes.members);
                }
            } catch (error) {
                showError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [gym?.id]);

    const handleText = async (e) => {
        const value = e.target.value;
        setWordSearch(value); // Actualizamos el estado para el input

        // Validamos usando 'value' directamente en lugar de 'wordSearch'
        if (value.length >= 3) {
            try {
                const data = await apiFetch(`/members/search/${gym?.id}?text=${value}`);
                if (data.success && data.members) {
                    setMembers(data.members);
                } else {
                    setMembers([]);
                }
            } catch (error) {
                showError(error.message);
            }
        } else {
            try {
                const data = await apiFetch(`/members/getrecently/${gym.id}`);
                if(data.success){
                    setMembers(data.members);
                }
            } catch (error) {
                showError(error.message);
            }
        }
    };
    // Arreglo para mapear las tarjetas de estadísticas limpiamente
    const statsConfig = [
        { title: "Total de Miembros", value: statsData.total,  key: "all"},
        { title: "Miembros a punto de vencer", value: statsData.toFinish,  key: "toFinish"},
        { title: "Miembros vencidos", value: statsData.finished,  key: "finished"},
        { title: "Nuevos miembros en el mes", value: statsData.newsAtMonth, key: "newsAtMonth" }
    ];

    return (
        <>
            {/* Cabecera */}
            <div className="flex justify-between items-center mb-5">
                <h1 className="text-xl font-bold text-gray-800">Miembros</h1>
                <NavLink to="./addMember">
                    <Button>+ Agregar nuevo miembro</Button>
                </NavLink>
            </div>

            {loading ? (
                <Spinner isLoading={true} />
            ) : (
                <>
                    {/* Barra de Búsqueda */}
                    <div className="flex items-center w-full my-4 bg-primary/10 rounded-2xl border border-primary/20 px-3 py-1">
                        <svg className="ml-3" width={25} height={25} enableBackground="new 0 0 32 32" id="Glyph" version="1.1" viewBox="0 0 32 32" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"><path d="M27.414,24.586l-5.077-5.077C23.386,17.928,24,16.035,24,14c0-5.514-4.486-10-10-10S4,8.486,4,14  s4.486,10,10,10c2.035,0,3.928-0.614,5.509-1.663l5.077,5.077c0.78,0.781,2.048,0.781,2.828,0  C28.195,26.633,28.195,25.367,27.414,24.586z M7,14c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S7,17.86,7,14z" id="XMLID_223_" /></svg>
                        <input
                            onChange={handleText}
                            value={wordSearch}
                            className="w-full bg-transparent p-2 focus:outline-none text-gray-700"
                            placeholder="Buscar miembro por nombre, correo o numero..."
                            type="text"
                        />
                    </div>

                    {/* Estadísticas (StatCards) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6">
                        {statsConfig.map((stat, index) => (
                            <NavLink to="./search" key={index} state={stat.key}> 
                                <StatCard key={index} title={stat.title} value={stat.value} />
                            </NavLink>
                        ))}
                    </div>

                    {/* Sección: Recientes */}
                    <div className="border-t border-slate-300 pt-4 mb-4">
                        <h2 className="text-lg font-semibold text-gray-800">{wordSearch.length >= 3 ? "Resultados de la busqueda" : "Agregados recientemente"}</h2>
                    </div>

                    {/* Grid de Miembros */}
                    {members.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {members.map((member) => (
                                <Membercard key={member.id} member={member} />
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-400 text-sm py-8 text-center bg-gray-50 rounded-xl border border-dashed border-gray-200">
                            {wordSearch.length >= 3 ? "No hay usuarios coincidentes" : "No hay miembros registrados recientemente."}
                        </p>
                    )}
                </>
            )}
        </>
    );
}
/*SI LEES ESTO ERES UN PAPU PRO :V */
export default Members;