import { motion } from "motion/react"

export default function Button({ children, color, onClick, type = "submit", loading, className }) {
    return (
        <motion.button whileHover={!loading && { scale: 1.2 }} whileTap={!loading && { scale: 0.8 }}
            onClick={onClick} type={type} disabled={loading}
            className={`${loading
                ? "bg-gray-400/50"
                : !className && "bg-primary/20 hover:bg-primary/40"
                } cursor-pointer
                ${className || "border border-primary px-5 py-2 rounded-2xl  hover:text-primary"}
            `}
        >
            {loading ? "cargando" : children}
        </motion.button>

    )
}