import PlanCard from "../../components/cards/PlanCard";
import Button from "../../components/buttons/button";
import FormAdd from "../../components/forms/formAdd";
import { NavLink } from "react-router-dom";
import { apiFetch } from "../../services/api";
import { useEffect , useState} from "react";

function Plans() {

    const [plans, setPlans] = useState([]);

    useEffect(() => {
        const getPlans = async () => {
            const data = await apiFetch("/gyms/getPlans");
            setPlans(data.plans)
           
        }

        getPlans();
        
    } , [])

    const stats = [
        { title: "Miembros", value: "150" },
        { title: "Entrenadores", value: "10" },
        { title: "Planes", value: "5" },
        { title: "Productos", value: "20" },
    ];

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

            <div className="mt-5 grid grid-cols-1 place-content-center w-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

                {
                    plans.map((plan, index) => (
                        <PlanCard key={index} name={plan.name} isActive={plan.isActive} id={plan.id}
                         description={plan.description} price={plan.price} duration={plan.durationDays} />
                    ))
                }

            </div>

        </>


    );
}

export default Plans;