import Button from "../buttons/button";
import { useNavigate } from 'react-router-dom';

export default function FormAdd({ children, onSubmit, title, loading }) {
    const navigate = useNavigate();

    return (
        <div className="flex items-center justify-center w-full min-h-[calc(100vh-10rem)] p-4">
            <form
                onSubmit={onSubmit}
                className="relative w-full max-w-2/3 bg-white border border-primary/20 rounded-2xl shadow-xl shadow-primary/10 overflow-hidden transition-all"
            >
                {/* LÍNEA DE ACENTO SUPERIOR CON COLOR PRIMARY */}
                <div className="h-2 w-full bg-primary" />

                <div className="p-6 sm:p-8">
                    {/* ENCABEZADO */}
                    {title && (
                        <div className="mb-6 text-center sm:text-left">
                            <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
                                {title}
                            </h1>
                            {/* Pequeña barra decorativa debajo del título */}
                            <div className="h-1 w-12 bg-primary rounded-full mt-2 mx-auto sm:mx-0" />
                        </div>
                    )}

                    {/* CONTENIDO Y CAMPOS DEL FORMULARIO */}
                    <div className="space-y-5 text-left">
                        {children}
                    </div>

                    {/* BOTONES DE ACCIÓN */}
                    <div className="flex items-center justify-end gap-3 pt-6 mt-8 border-t border-slate-100">
                        <Button 
                            type="button" 
                            onClick={() => navigate(-1)}
                            className=""
                        >
                            Cancelar
                        </Button>
                        <Button 
                            type="submit" 
                            loading={loading}
                            
                        >
                            Subir
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}