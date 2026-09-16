import StatCard from "../../components/cards/StatCard";
import Button from "../../components/buttons/button";
import { NavLink } from "react-router-dom";
import Membercard from "../../components/cards/MemberCard";
import { useState, useEffect } from "react";
import useGym from "../../hooks/useGym"
import { apiFetch } from "../../services/api";
import showError from "../../components/messages/showError"

function Members() {

    const { gym } = useGym();
    const [members, setMembers] = useState([])

    useEffect(() => {
        if(gym?.id === null){
            return
        }

        const getMembers = async () => {
            try{
                const data = await apiFetch(`/gyms/${gym?.id}/getMembers`);
                data.success && setMembers(data.members); 
            }catch(error){
                showError(error.message);
            }
            

        }

        if(gym?.id){
            getMembers();
        } 


    }, [gym?.id])

    if(members.length !== 0) console.log(members);
 
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
                    members.map((member) => (
                        <Membercard key={member.id} member={member}  />
                    ))
                }

            </div>
        </>


    );
}

export default Members;