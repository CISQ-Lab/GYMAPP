import FormAdd from "../../components/forms/formAdd";
import Input from "../../components/input";
import { useState } from "react";
import { apiFetch } from "../../services/api";
import showError from "../../components/messages/showError";
import Success from "../../components/messages/success";

export default function AddNewPlan() {

    const [form, setForm] = useState({
        name: "",
        description: "",
        price: ""
    })

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

            if(data.planId){
                Success(data.message)
            }
        }
        catch(error){
            showError(error)
        }
        
        
    }

    return (
        <FormAdd title="Agregar nuevo plan" onSubmit={handleSubmit} >
            <Input type="text" ph="Nombre" name="name" value={form.name} onChange={handleChange} />
            <Input type="text" ph="Descripcion" name="description" value={form.description} onChange={handleChange} />
            <Input type="number" ph="Precio" step="any" name="price" value={form.price} onChange={handleChange} />

        </FormAdd>
    )



}