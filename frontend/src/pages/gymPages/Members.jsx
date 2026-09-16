import Button from "../../components/buttons/button";
import { NavLink } from "react-router-dom";
import Membercard from "../../components/cards/MemberCard";
import { useState, useEffect } from "react";
import useGym from "../../hooks/useGym"
import { apiFetch } from "../../services/api";
import showError from "../../components/messages/showError"
import Spinner from "../../components/layout/spinner";

function Members() {

    const { gym } = useGym();
    const [members, setMembers] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (gym?.id === null) {
            return
        }

        const getMembers = async () => {
            try {
                const data = await apiFetch(`/gyms/${gym?.id}/getMembers`);
                data.success && setMembers(data.members);
                setLoading(false);
            } catch (error) {
                showError(error.message);
            }


        }

        if (gym?.id) {
            getMembers();
        }


    }, [gym?.id])


    return (
        <>
            <div className="flex justify-between items-center mb-2">
                <h1>Miembros</h1>
                <NavLink to="./addMember">
                    <Button>+ Agregar nuevo miembro</Button>
                </NavLink>

            </div>

            {loading ? <Spinner isLoading={true} /> :
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

                    {
                        members.map((member) => (
                            <Membercard key={member.id} member={member} />
                        ))
                    }

                </div>
            }



        </>


    );
}

export default Members;