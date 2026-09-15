import PlanCard from "../../components/cards/PlanCard";
import Button from "../../components/buttons/button";
import { NavLink } from "react-router-dom";
import { apiFetch } from "../../services/api";
import { useEffect, useState } from "react";
import useGym from "../../hooks/useGym";

function Plans() {

    const [plans, setPlans] = useState([]);

    const { gym } = useGym();

    const fetchPlans = async () => {
        if (!gym?.id) {
            return;
        }
        const data = await apiFetch(`/gyms/${gym?.id}/getPlans`);
        setPlans(data.plans)
    }

    const deletePlanFromUI = (id) => {
        setPlans(prevPlans =>
            prevPlans.filter(plan => plan.id !== id)
        );
    };

    useEffect(() => {
        fetchPlans();
    }, [gym?.id])


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



            {plans.length !== 0 ?
                <div className="mt-5 grid grid-cols-1 place-content-center w-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {
                        plans.map((plan) => (
                            <PlanCard key={plan.id} name={plan.name} isActive={plan.isActive}
                                id={plan.id} Delete={deletePlanFromUI} description={plan.description}
                                price={plan.price} duration={plan.durationDays} />
                        ))
                    }
                </div>
                :
                <div className="flex flex-col items-center mt-5">

                    <div className="border border-primary p-10 space-y-5 flex flex-col items-center
                    rounded-2xl bg-primary/30">

                        <p>No hay planes para mostrar</p>
                        <NavLink to="/plans/addplan">
                            <Button>
                                + Agrega un plan para comenzar!
                            </Button>
                        </NavLink>

                    </div>


                </div>


            }



        </>


    );
}

export default Plans;