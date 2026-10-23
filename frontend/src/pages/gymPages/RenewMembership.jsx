import { useEffect, useState } from "react";
import { useLocation, useNavigate, NavLink } from "react-router-dom";
import MemberCard from "../../components/cards/MemberCard";
import FormAdd from "../../components/forms/FormAdd";
import Select from "../../components/layout/Select";
import showError from "../../components/messages/showError";
import success from "../../components/messages/success";
import useGym from "../../hooks/useGym";
import { apiFetch } from "../../services/api";
import Button from "../../components/buttons/Button";

export default function RenewMembership() {
    const location = useLocation();
    const navigate = useNavigate();
    const { gym } = useGym();

    // Extraer adecuadamente el objeto member de location.state
    const member = location?.state;

    const [plans, setPlans] = useState([]);
    const planActual = plans.find((plan) => plan.id === member?.membership_id);
    const [selectedPlan, setSelectedPlan] = useState({});
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [dateEnd, setDateEnd] = useState();

    const date = new Date()
    const dateInit = date.toLocaleDateString();
    const CalculateDateEnd = (plan) => {
        // 1. Clonamos tu fecha de referencia para no modificar la original
        const fechaCopia = new Date(date.getTime());

        // 2. Obtenemos los días a sumar
        const diasASumar = plan?.durationDays || 0;

        // 3. Modificamos solo la copia
        fechaCopia.setDate(fechaCopia.getDate() + diasASumar);

        // 4. Formateamos el resultado final
        const endDate = fechaCopia.toLocaleDateString();

        return endDate;

    }


    useEffect(() => {
        planActual && setSelectedPlan(planActual)
        const endDate = CalculateDateEnd(planActual);
        setDateEnd(endDate);
    }, [planActual])


    useEffect(() => {
        if (!gym?.id) return;

        const getPlans = async () => {
            try {
                setLoading(true);
                const data = await apiFetch(`/gyms/${gym.id}/getplans/?active=1`);

                if (data.success) {
                    setPlans(data.plans || []);
                }
            } catch (error) {
                showError(error.message);
            } finally {
                setLoading(false);
            }
        };

        getPlans();
    }, [gym?.id]);

    const handleSelectChange = (e) => {
        const selectedId = e.target.value;
        const selectedPlan = plans.find((plan) => String(plan?.id) === String(selectedId));

        
        const endDate = CalculateDateEnd(selectedPlan);
        setSelectedPlan(selectedPlan);
        setDateEnd(endDate);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedPlan) {
            showError("Por favor, selecciona un plan para renovar.");
            return;
        }

        try {
            setSubmitting(true);
            const data = await apiFetch(`/members/${member?.id}/renew`, {
                method: "POST",
                body: JSON.stringify({
                    planId: selectedPlan,
                    gymId: gym?.id
                })
            });

            if (data.success) {
                success(data.message || "Membresía renovada con éxito");
                navigate("/members"); // Redirigir a la lista de miembros
            } else {
                showError(data.message);
            }
        } catch (error) {
            showError(error.message);
        } finally {
            setSubmitting(false);
        }
    };

    // Redirección de seguridad si la vista se abre sin seleccionar un miembro
    if (!member) {
        return (
            <div className="p-6 text-center text-slate-600 space-y-3">

                <p>No se seleccionó ningún miembro para renovar.</p>
                <Button type="button" onClick={() => navigate(-1)}> ← Regresar </Button>
            </div>
        );
    }

    return (
        <div className="flex flex-col max-w-5xl mx-auto w-full p-4">
            <FormAdd
                title="Renovar Membresía"
                loading={loading || submitting}
                uploadButton="Renovar Ahora"
                onSubmit={handleSubmit}
            >
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">

                    {/* Panel de Selección de Plan */}
                    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 flex flex-col">

                        {/* Selector de nuevo plan */}
                        <div className="flex flex-col justify-center">
                            <label className="block text-xs font-semibold text-slate-600 mb-4">
                                Seleccionar nuevo plan
                            </label>
                            <Select
                                name="planId"
                                value={selectedPlan.id}
                                onChange={handleSelectChange}
                                placeholder="-- Selecciona un plan para renovar --"
                            >
                                {plans.map((plan) => (
                                    <option key={plan.id} value={plan.id}>
                                        {plan.name} - ${plan.price}
                                    </option>
                                ))}
                            </Select>
                        </div>

                        {/* Detalles del Plan Actual (Renderizado Seguro) */}
                        <div className="mt-4 pt-4 border-t border-slate-200 text-xs text-slate-600 space-y-1">
                            <span className="font-semibold text-slate-600 block uppercase tracking-wider text-[10px]">
                                Plan Seleccionado
                            </span>
                            {selectedPlan ? (
                                <>
                                    <div className="flex justify-between items-center text-sm font-medium text-slate-800">
                                        <span>{selectedPlan.name}</span>
                                        <span className="text-emerald-600 font-bold">${selectedPlan.price}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm font-medium text-slate-800">
                                        <span>Inicio: </span>
                                        <span className="font-bold">{dateInit}</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm font-medium text-slate-800">
                                        <span>Fin: </span>
                                        <span className="text-red-600 font-bold">{dateEnd}</span>
                                    </div>
                                </>
                            ) : (
                                <p className="italic text-slate-400">
                                    {loading ? "Cargando plan..." : "Sin plan activo registrado"}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Tarjeta del Miembro */}
                    <div className="">
                        <MemberCard member={member} type="info" />
                    </div>

                </div>
            </FormAdd>
        </div>
    );
}