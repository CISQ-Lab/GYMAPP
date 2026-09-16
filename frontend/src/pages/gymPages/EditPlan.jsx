import FormAdd from "../../components/forms/FormAdd";
import Input from "../../components/layout/input";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { apiFetch } from "../../services/api";
import showError from "../../components/messages/showError";
import Success from "../../components/messages/success";
import Button from "../../components/buttons/Button";

export default function EditPlan() {

    const location = useLocation();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const planId = location.state?.id;

    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        duration: ""
    })

    useEffect(() => {

        if (!planId) {
            navigate('/plans');
        }

        const getPlan = async () => {
            try {
                const data = await apiFetch(`/gyms/getPlan/${planId}`)
                if (data.success) {
                    const plan = data.plan;
                    setForm({
                        name: plan.name,
                        description: plan.description,
                        price: plan.price,
                        duration: plan.durationDays
                    });
                    setLoading(false);
                }
                else {
                    throw new Error("No se puede cargar el plan, intenta nuevamente.")
                }
            } catch (error) {
                showError(error.message);
            }
        }
        getPlan();

    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {
            const data = await apiFetch(`/gyms/editPlan/${planId}`, {
                method: 'PUT',
                body: JSON.stringify({
                    form
                })
            })

            if (data.success) {
                Success(data.message)
            }
        }
        catch (error) {
            showError(error.message)
        }


    }

    return (

        <>

            <Button type="button" onClick={() => navigate(-1)}> ← Regresar </Button>

            <FormAdd title="Editar Plan" onSubmit={handleSubmit} loading={loading} >
                <Input type="text" ph="Nombre" name="name" value={form.name} onChange={handleChange} required />
                <Input type="text" ph="Descripcion" name="description" value={form.description} onChange={handleChange} />
                <Input type="number" ph="Precio" step="any" name="price" value={form.price} onChange={handleChange} required />
                <Input type="number" ph="Duracion en dias" name="duration" value={form.duration} onChange={handleChange} required />
            </FormAdd>
        </>
    )



}