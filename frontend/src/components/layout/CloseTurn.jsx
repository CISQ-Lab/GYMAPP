import { useState } from "react";
import useCD from "../../hooks/useCD";
import FormAdd from "../forms/FormAdd"
import Input from "./Input"
import { useEffect } from "react";
import { apiFetch } from "../../services/api";
import Success from "../messages/success";
import showError from "../messages/showError";
import { useNavigate } from "react-router-dom";

export default function CloseTurn() {

    const {cashDrawer, closeTurn} = useCD();
    const navigate = useNavigate();
    const [formData, setFormData] = useState(
        {
            ending_cash: "",
            ending_cash_expected: "",
            difference: "",
            notes: ""
        }
    );


    useEffect(() => {
        if(!cashDrawer){
            showError("No hay una caja abierta");
            navigate("/dashboard");
        }
    }, [])

    const calculateDifference = () => {
        const difference = formData.ending_cash - formData.ending_cash_expected;
        setFormData((prev) => ({
            ...prev,
            difference: difference
        }))
    }

    const handleChange = (e) => {
        const {name, value} = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    useEffect(() => {

        if(!cashDrawer){
            return;
        }

         setFormData((prev) => ({
            ...prev,
            ending_cash_expected: cashDrawer?.ending_cash_expected
        }))

    }, [cashDrawer])

    useEffect(calculateDifference, [formData.ending_cash, formData.ending_cash_expected])


    const handleSubmit = async (e) => {
        e.preventDefault();

        formData.cdId = cashDrawer?.id;
        
        try {
            const data = await apiFetch("/cashDrawer/closeCD", {
                method: 'PATCH',
                body: JSON.stringify({
                    formData
                })
            });
            if(data.success){
                Success(data.message);
                closeTurn();
                navigate("/dashboard");
            }
        } catch (error) {
            showError(error.message);
        }
        
    }

    return (
        <FormAdd title="Cerrar turno" onSubmit={handleSubmit}>

            <Input ph="Monto final" type="number" value={formData.ending_cash} name="ending_cash" onChange={handleChange} required />
            <Input ph="Monto en caja" value={formData.ending_cash_expected} onChange={handleChange} type="number" name="ending_cash_expected" disabled />
            <Input ph="Diferencia" value={formData.difference} onChange={handleChange} type="number" name="difference" disabled/>
            <textarea className="border border-black py-2 px-5 w-4/5 h-25 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary "
                name="notes" placeholder="Notas adicionales" value={formData.notes} onChange={handleChange} />

        </FormAdd>
    )
}