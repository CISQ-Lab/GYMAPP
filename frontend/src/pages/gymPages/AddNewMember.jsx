import FormAdd from "../../components/forms/FormAdd";
import Input from "../../components/layout/Input";
import { useState, useEffect } from "react";
import { apiFetch } from "../../services/api";
import showError from "../../components/messages/showError";
import Success from "../../components/messages/success";
import useGym from "../../hooks/useGym";
import Button from "../../components/buttons/Button";
import { useNavigate } from "react-router-dom";
import Select from "../../components/layout/Select";
import Camera from "../../components/layout/Camera";
import DropZone from "../../components/layout/Dropzone";
import confirmation from "../../components/messages/confirmation"
import Swal from "sweetalert2";

export default function AddNewMember() {

    const { gym } = useGym();
    const [plans, setPlans] = useState([])
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [file, setFile] = useState(null);
    const [cameraOpen, setCameraOpen] = useState(false);



    const [form, setForm] = useState({
        name: "",
        surname: "",
        phone: "",
        email: "",
        planId: ""
    })

    useEffect(() => {
        if (!gym?.id) {
            return setLoading(true);
        }

        const loadPlans = async () => {
            const data = await apiFetch(`/gyms/${gym?.id}/getPlans?active=1`);
            if (data.success) {
                return data.plans;
            }
            else {
                return [];
            }
        }

        loadPlans().then((p) => {
            if (p.length === 0) {
                return;
            }
            else {
                setPlans(p);
                setLoading(false);
            }
        })


    }, [gym?.id])


    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (formElement) => { // Recibe el formulario directamente

        Swal.fire({
            title: "Guardando...",
            allowOutsideClick: false,
            allowEscapeKey: false,
            showConfirmButton: false,
            didOpen: () => {
                Swal.showLoading();
            }
        });

        // Usamos el formElement que guardamos de forma segura
        const formData = new FormData(formElement);

        if (file && !formData.get("foto_perfil")) {
            formData.append("foto_perfil", file);
        }
        const foto = formData.get("foto_perfil");

        if (!foto || foto.name === "" || foto.size === 0) {
            showError("Sube una foto del usuario");
            return;
        }

        formData.append("gymId", gym?.id);

        try {
            const data = await apiFetch("/gyms/addNewMember", {
                method: "POST",
                body: formData
            });

            if (data.success) {
                Success(data.message);
            } else {
                showError(data.message);
            }
        } catch (error) {
            showError(error.message);
        }
    }

    const confirmAdd = (e) => {
        e.preventDefault();

        // 1. Guardamos una referencia fija al formulario antes de abrir la alerta
        const formElement = e.currentTarget;

        // 2. Pasamos un callback () => ... para que se espere a la confirmación
        confirmation({
            text: "Recuerda cobrar el costo del plan", onConfirm: () => {
                handleSubmit(formElement);
            }, confirmText: "Lo tengo"
        });
    }


    return (
        <>

            <Button type="button" onClick={() => navigate(-1)}> ← Regresar </Button>
            <FormAdd title="Agregar nuevo Miembro" onSubmit={confirmAdd} loading={loading} id="myform">
                <div className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] m-5 xl:mr-15">

                    <div className="space-y-4 mb-5 xl:mb-0">
                        <Input type="text" ph="Escribe el nombre del nuevo miembro" name="name" value={form.name} onChange={handleChange} required />
                        <Input type="text" ph="Escribe el apellido del nuevo miembro" name="surname" value={form.surname} onChange={handleChange} required />
                        <Input type="text" ph="Telefono del nuevo miembro" name="phone" value={form.phone} onChange={handleChange} />
                        <Input type="text" ph="Email del nuevo miembro" name="email" value={form.email} onChange={handleChange} />
                        <Select name="planId" items={plans} onChange={handleChange} value={form.planId} placeholder="-- Selecciona un plan --" />
                    </div>

                    <div>

                        {!cameraOpen ?
                            <><DropZone name="foto_perfil" setFile={setFile} />
                                <Button type="button" onClick={() => setCameraOpen(true)}>Abrir Camara</Button> </> :
                            <Camera setCameraOpen={setCameraOpen} setFile={setFile} />


                        }

                    </div>




                </div >


            </FormAdd >
        </>
    )



}