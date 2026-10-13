import Button from "../../components/buttons/Button";
import { NavLink } from "react-router-dom";
import Membercard from "../../components/cards/MemberCard";
import { useState, useEffect } from "react";
import useGym from "../../hooks/useGym"
import { apiFetch } from "../../services/api";
import showError from "../../components/messages/showError"
import Spinner from "../../components/layout/Spinner";
import StatCard from "../../components/cards/StatCard";

function Members() {

    const { gym } = useGym();
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [numMembers, setNumMembers] = useState(-1);
    const [numMembersToFinish, setNumMembersToFinish] = useState(-1);
    const [numMembersFinished, setMembersFinished] = useState(-1);
    const [numNewMembersMonth, setNumNewMembersMonth] = useState(-1);

    const getStats = async (gymId) => {

        try {
            const data = await apiFetch(`/members/getStats/${gymId}`)
            console.log(data.stats);
            if(data.success){
                setNumMembers(data.stats.total || 0);
                setNumMembersToFinish(data.stats.toFinish || 0);
                setMembersFinished(data.stats.finished || 0);
                setNumNewMembersMonth(data.stats.newsAtMonth || 0);
            }


        } catch (error) {
            showError(error.message);
        }
    }

    useEffect(() => {
        if (!gym?.id) {
            return
        }

        getStats(gym?.id);

        const getMembers = async () => {
            try {
                const data = await apiFetch(`/gyms/${gym?.id}/getMembers`);
                if (data.success && data.members) {
                    setMembers(data.members);
                }
            } catch (error) {
                showError(error.message);
            }
            finally {
                setLoading(false);
            }


        }

        if (gym?.id) {
            getMembers();
        }

    }, [gym?.id])

    const stats = [
        { title: "Total de Miembros", value: numMembers },
        { title: "Miembros a punto de vencer", value: numMembersToFinish },
        { title: "Miembros vencidos", value: numMembersFinished },
        { title: "Nuevos miembros en el mes", value: numNewMembersMonth }
    ];




    return (
        <>


            <div className="flex justify-between items-center mb-5">
                <h1>Miembros</h1>
                <NavLink to="./addMember">
                    <Button>+ Agregar nuevo miembro</Button>
                </NavLink>

            </div>

            {loading ? <Spinner isLoading={true} /> :

                <>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {stats.map((stat, index) => (
                            <StatCard key={index} title={stat.title} value={stat.value} />
                        ))}
                    </div>

                    <div className="flex space-x-3 w-full my-2 justify-center items-center bg-primary/20 rounded-2xl">
                        <svg className="ml-3" width={25} height={25} enable-background="new 0 0 32 32" id="Glyph" version="1.1" viewBox="0 0 32 32" xml:space="preserve" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M27.414,24.586l-5.077-5.077C23.386,17.928,24,16.035,24,14c0-5.514-4.486-10-10-10S4,8.486,4,14  s4.486,10,10,10c2.035,0,3.928-0.614,5.509-1.663l5.077,5.077c0.78,0.781,2.048,0.781,2.828,0  C28.195,26.633,28.195,25.367,27.414,24.586z M7,14c0-3.86,3.14-7,7-7s7,3.14,7,7s-3.14,7-7,7S7,17.86,7,14z" id="XMLID_223_"/></svg>
                        <input className="w-full rounded-2xl p-2" placeholder="Buscar..."  type="text" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

                        {
                            members.map((member) => (
                                <Membercard key={member.id} member={member} />
                            ))
                        }

                    </div>

                </>
            }



        </>


    );
}

export default Members;