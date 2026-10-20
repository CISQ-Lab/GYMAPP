import { useState, useEffect } from "react";
import Button from "../../components/buttons/Button";
import Membercard from "../../components/cards/MemberCard";
import Spinner from "../../components/layout/Spinner";
import showError from "../../components/messages/showError";
import useGym from "../../hooks/useGym";
import { apiFetch } from "../../services/api";
import Select from "../../components/layout/Select"
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function SearchMembers() {

    const navigate = useNavigate();
    const location = useLocation();
    const filterStart = location?.state;

    const { gym } = useGym();
    const [members, setMembers] = useState([]);
    const [memberships, setMemberships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [wordSearch, setWordSearch] = useState("");

    const stateFilters = [
        { title: "Todos", value: "all" },
        { title: "Activos", value: "active" },
        { title: "Suspendidos", value: "notActive" },
        { title: "A punto de expirar", value: "toFinish" },
        { title: "Membresia expirada", value: "finished" },
        { title: "Nuevos en el mes", value: "newsAtMonth" }
    ]

    useEffect(() => {
        if (!gym?.id) return;

        const getPlans = async () => {
            const data = await apiFetch(`/gyms/${gym?.id}/getPlans?active=1`);
            if (data.success) {
                setMemberships(data.plans)
                return;
            }
        }

        const getMembers = async () => {
            const data = await apiFetch(`/members/getmembers/${gym?.id}?${location?.state}`);
            if (data.success) {
                setMembers(data.members)
                return;
            }
        }

        getPlans();
        getMembers();

        setLoading(false);

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
        }
    };


    return (
        <>
            {/* Cabecera */}
            <Button type="button" onClick={() => navigate(-1)}> ← Regresar </Button>
            <div className="flex justify-between items-center mt-5">
                <h1 className="text-xl font-bold text-gray-800">Busqueda Avanzada</h1>
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

                    <div className="flex space-x-4 mb-4">
                        <Select items={stateFilters} placeholder="-- Selecciona un estado --">
                            {stateFilters.map((state) => (

                                <option value={state.value} key={state.value} selected={filterStart == state.value}>{state.title}</option>

                            ))}
                        </Select>
                        <Select items={memberships} placeholder="-- Tipo de membresia --">
                            {
                                memberships?.map((membership) => (
                                    <option value={membership.id} key={membership.id} > {membership.name} </option>
                                ))
                            }
                        </Select>


                    </div>


                    {/* Sección: Recientes */}
                    <div className="border-t border-slate-300 pt-4 mb-4">
                        <h2 className="text-lg font-semibold text-gray-800">Resultados:</h2>
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
                            {wordSearch.length >= 3 ? "No hay usuarios coincidentes" : "No hay resultados."}
                        </p>
                    )}
                </>
            )}
        </>
    );
}
/*SI LEES ESTO ERES UN PAPU PRO :V */
export default SearchMembers;