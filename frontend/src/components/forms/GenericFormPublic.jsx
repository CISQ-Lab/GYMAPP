import { motion } from "motion/react";

export default function GenericFormPublic({ handleSubmit, children, hidden }) {
    return (
        <motion.div
            // Estado inicial al montar el componente en el DOM
            initial={{ opacity: 0, scale: 0, x: -48 }}
            
            // Estado dinámico basado en el prop 'hidden'
            animate={{ 
                opacity: hidden ? 0 : 1, 
                scale: hidden ? 0.2 : 1, 
                x: hidden ? -48 : 0, // -48px equivale a -translate-x-12 de Tailwind
                pointerEvents: hidden ? "none" : "auto" 
            }}
            
            // Configuración del resorte (spring) para un movimiento natural
            transition={{
                type: "spring", 
                stiffness: 120, 
                damping: 20,
                mass: 0.8 // Un poco más ligero para que se sienta rápido
            }}
            
            // Clases de Tailwind limpias (sin transition ni transform)
            className="absolute z-10 w-[calc(100%-4rem)] max-w-md p-7 sm:p-8 rounded-xl shadow-2xl bg-red-400/10 backdrop-blur-sm"
        >
            <form onSubmit={handleSubmit} id="login">
                <div className="flex flex-col space-y-4">
                    {children}
                </div>
            </form>
        </motion.div>
    );
}
