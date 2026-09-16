import FormAdd from "../../components/forms/FormAdd";
import Input from "../../components/layout/input";
import { useState, useEffect, useRef } from "react";
import { apiFetch } from "../../services/api";
import showError from "../../components/messages/showError";
import Success from "../../components/messages/success";
import useGym from "../../hooks/useGym";
import Button from "../../components/buttons/button";
import { useNavigate } from "react-router-dom";
import Select from "../../components/layout/Select";
import { motion } from "framer-motion";

export default function AddNewMember() {

    const { gym } = useGym();
    const [plans, setPlans] = useState([])
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

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
            const data = await apiFetch(`/gyms/${gym?.id}/getPlans`);
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

    // Funciones para manejar el Drag & Drop
    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            processFile(e.dataTransfer.files[0]);
        }
    };

    // Función para manejar la selección manual de archivos
    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            processFile(e.target.files[0]);
        }
    };

    // Procesar el archivo y crear una URL para la previsualización
    const processFile = (selectedFile) => {
        // Validar que sea una imagen (opcional, pero recomendado)
        if (selectedFile.type.startsWith("image/")) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        } else {
            showError("Por favor, seleccione un archivo de imagen válido.");
        }
    };

    // Función para eliminar la imagen seleccionada
    const removeImage = (e) => {
        e.stopPropagation(); // Evita que al hacer clic en la "X" se abra el explorador de archivos
        setFile(null);
        setPreview(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {

        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const foto = formData.get("foto_perfil");

        if(!foto || foto.name === "" || foto.size === 0){
            showError("Sube una foto del usuario")
            return;
        }
        
        formData.append("gymId", gym?.id);

        try {
            const data = await apiFetch("/gyms/addNewMember", {
                method: "POST",
                body: formData
            })

            if (data.success) {
                Success(data.message)
            }
            else{
                showError(data.message);
            }
        }
        catch (error) {
            showError(error.message)
        }


    }

    return (
        <>
            <Button type="button" onClick={() => navigate(-1)}> ← Regresar </Button>
            <FormAdd title="Agregar nuevo Miembro" onSubmit={handleSubmit} loading={loading} id="myform">
                <div className="grid grid-cols-1 2xl:grid-cols-[2fr_1fr] m-5 mr-15">

                    <div className="space-y-4">
                        <Input type="text" ph="Escribe el nombre del nuevo miembro" name="name" value={form.name} onChange={handleChange} required />
                        <Input type="text" ph="Escribe el apellido del nuevo miembro" name="surname" value={form.surname} onChange={handleChange} required />
                        <Input type="text" ph="Telefono del nuevo miembro" name="phone" value={form.phone} onChange={handleChange} />
                        <Input type="text" ph="Email del nuevo miembro" name="email" value={form.email} onChange={handleChange} />
                        <Select name="planId" items={plans} onChange={handleChange} placeholder="-- Selecciona un plan --" />
                    </div>

                    <div className="">
                        {/* Dropzone */}
                        <div className="flex flex-col gap-2 mb-8">
                            <p className="text-black font-medium">Sube una foto del nuevo miembro</p>

                            <div
                                onDragOver={handleDragOver}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDrop}
                                onClick={() => fileInputRef.current?.click()}
                                className={`relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200 overflow-hidden ${isDragging
                                    ? "border-primary bg-primary/50"
                                    : "border-primary hover:bg-gray-800/60 hover:primary"
                                    }`}
                            >
                                {preview ? (
                                    // Vista previa de la imagen
                                    <div className="relative w-full h-full flex items-center justify-center p-4">
                                        <img
                                            src={preview}
                                            alt="Preview"
                                            className="max-h-full max-w-full object-contain rounded-lg shadow-lg"
                                        />
                                        <motion.button whileHover={{scale: 1.3}} whileTap={{scale: 0.90}} 
                                            type="button"
                                            onClick={removeImage}
                                            className="cursor-pointer absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-md transition-colors"
                                            title="Eliminar imagen"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                        </motion.button>
                                    </div>
                                ) : (
                                    // Estado vacío del dropzone
                                    <div className="flex flex-col items-center justify-center text-center p-6">
                                        <svg className={`w-12 h-12 mb-4 transition-colors ${isDragging ? "text-red-500" : "text-gray-600"}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v9m-5 0H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2M8 9l4-5 4 5m1 8h.01" />
                                        </svg>
                                        <p className="mb-2 text-sm text-black">
                                            <span className="font-semibold text-primary">Haz clic para subir</span> o arrastra y suelta
                                        </p>
                                        <p className="text-xs text-gray-700">PNG, JPG o WEBP (Max. 30MB)</p>
                                    </div>
                                )}

                                <input
                                    ref={fileInputRef}
                                    name="foto_perfil"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden" 
                                />
                            </div>
                        </div>
                    </div>

                </div>


            </FormAdd>
        </>
    )



}