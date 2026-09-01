import { useState, useRef } from "react";
import LayoutPublic from "../../components/layoutPublic";
import GenericForm from "../../components/forms/GenericFormPublic";
import useAuth from "../../hooks/useAuth";
import showError from "../../components/messages/showError.js";

export default function CreateNewGym() {
    const { user } = useAuth();

    // Estados para manejar el formulario y el dropzone
    const [gymName, setGymName] = useState("");
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [isDragging, setIsDragging] = useState(false);

    const fileInputRef = useRef(null);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        
        let fileName = file ? file.name : null;
        console.log("Datos a enviar:", { gymName, file });
        // Aquí puedes agregar tu lógica de envío (Fetch, Axios, etc.)
    };

    return (

        <LayoutPublic>
            <GenericForm handleSubmit={handleSubmit}>
                    <h2 className="text-2xl font-bold text-center mb-2 text-white">
                        Bienvenido, {user?.name}!
                    </h2>
                    <p className="text-white text-center mb-6">
                        ¡Comienza a administrar tu gimnasio de manera inteligente!
                    </p>

                    {/* Input de Nombre */}
                    <div className="flex flex-col gap-2 mb-6">
                        <input
                            type="text"
                            value={gymName}
                            onChange={(e) => setGymName(e.target.value)}
                            placeholder="Nombre del gimnasio"
                            className="w-full border text-white border-gray-600 bg-gray-800/50 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent placeholder:text-gray-400 transition-all"
                        />
                    </div>

                    {/* Dropzone */}
                    <div className="flex flex-col gap-2 mb-8">
                        <p className="text-white font-medium">Sube el logo que representa tu gimnasio</p>

                        <div
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current?.click()}
                            className={`relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200 overflow-hidden ${isDragging
                                ? "border-red-500 bg-red-500/10"
                                : "border-gray-500 bg-gray-800/30 hover:bg-gray-800/60 hover:border-red-400"
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
                                    <button
                                        type="button"
                                        onClick={removeImage}
                                        className="absolute top-4 right-4 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-md transition-colors"
                                        title="Eliminar imagen"
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                                    </button>
                                </div>
                            ) : (
                                // Estado vacío del dropzone
                                <div className="flex flex-col items-center justify-center text-center p-6">
                                    <svg className={`w-12 h-12 mb-4 transition-colors ${isDragging ? "text-red-500" : "text-gray-400"}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 5v9m-5 0H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2M8 9l4-5 4 5m1 8h.01" />
                                    </svg>
                                    <p className="mb-2 text-sm text-gray-300">
                                        <span className="font-semibold text-red-400">Haz clic para subir</span> o arrastra y suelta
                                    </p>
                                    <p className="text-xs text-gray-500">PNG, JPG o WEBP (Max. 30MB)</p>
                                </div>
                            )}

                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                            />
                        </div>
                    </div>

                    <button
                        className="w-full cursor-pointer border border-red-700 bg-red-600/20 hover:bg-red-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-300 shadow-lg shadow-red-900/20"
                        type="submit"
                    >
                        Registrar gimnasio
                    </button>
            </GenericForm>
        </LayoutPublic>

    );
}