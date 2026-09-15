import FormAdd from "../../components/forms/formAdd";
import Input from "../../components/layout/input";
import { useState, useEffect } from "react";
import { apiFetch } from "../../services/api";
import showError from "../../components/messages/showError";
import Success from "../../components/messages/success";
import useGym from "../../hooks/useGym";
import Button from "../../components/buttons/button";
import { useNavigate } from "react-router-dom";

export default function AddNewPlan() {

    const { gym } = useGym();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const [form, setForm] = useState({
        name: "",
        description: "",
        price: "",
        duration: ""
    })

    useEffect(() => {
        if (!gym?.id) {
            return setLoading(true);
        }

        setForm({
            ...form,
            gymId: gym.id
        })
        return setLoading(false);

    }, [gym?.id])

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
            const data = await apiFetch("/gyms/addPlan", {
                method: 'POST',
                body: JSON.stringify({
                    form
                })
            })

            if (data.planId) {
                Success(data.message)
            }
        }
        catch (error) {
            showError(error)
        }


    }

    return (
        <>
            <Button type="button" onClick={() => navigate(-1)}> ← Regresar </Button>
            <FormAdd title="Agregar nuevo plan" onSubmit={handleSubmit} loading={loading} >
                <Input type="text" ph="Nombre" name="name" value={form.name} onChange={handleChange} required />
                <Input type="text" ph="Descripcion" name="description" value={form.description} onChange={handleChange} />
                <Input type="number" ph="Precio" step="any" name="price" value={form.price} onChange={handleChange} required />
                <Input type="number" ph="Duracion en dias" name="duration" value={form.duration} onChange={handleChange} required />
                <Input type="text" ph="Nombre" name="name" value={form.name} onChange={handleChange} required />
                <Input type="text" ph="Descripcion" name="description" value={form.description} onChange={handleChange} />
                <Input type="number" ph="Precio" step="any" name="price" value={form.price} onChange={handleChange} required />
                <Input type="number" ph="Duracion en dias" name="duration" value={form.duration} onChange={handleChange} required />
                <Input type="text" ph="Nombre" name="name" value={form.name} onChange={handleChange} required />
                <Input type="text" ph="Descripcion" name="description" value={form.description} onChange={handleChange} />
                <Input type="number" ph="Precio" step="any" name="price" value={form.price} onChange={handleChange} required />
                <Input type="number" ph="Duracion en dias" name="duration" value={form.duration} onChange={handleChange} required />
                <Input type="text" ph="Nombre" name="name" value={form.name} onChange={handleChange} required />
                <Input type="text" ph="Descripcion" name="description" value={form.description} onChange={handleChange} />
                <Input type="number" ph="Precio" step="any" name="price" value={form.price} onChange={handleChange} required />
                <Input type="number" ph="Duracion en dias" name="duration" value={form.duration} onChange={handleChange} required />
                <Input type="text" ph="Nombre" name="name" value={form.name} onChange={handleChange} required />
                <Input type="text" ph="Descripcion" name="description" value={form.description} onChange={handleChange} />
                <Input type="number" ph="Precio" step="any" name="price" value={form.price} onChange={handleChange} required />
                <Input type="number" ph="Duracion en dias" name="duration" value={form.duration} onChange={handleChange} required />
                <Input type="text" ph="Nombre" name="name" value={form.name} onChange={handleChange} required />
                <Input type="text" ph="Descripcion" name="description" value={form.description} onChange={handleChange} />
                <Input type="number" ph="Precio" step="any" name="price" value={form.price} onChange={handleChange} required />
                <Input type="number" ph="Duracion en dias" name="duration" value={form.duration} onChange={handleChange} required />
            </FormAdd>
        </>
    )



}