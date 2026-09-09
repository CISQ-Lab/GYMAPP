import { motion } from "motion/react"

export default function Button({ children , color, onClick, type="submit"}) {
    return (
        <motion.button whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.8 }} onClick={onClick} type={type}
        className="bg-primary/20 border border-primary px-5 py-2 rounded-2xl cursor-pointer hover:bg-primary/40 hover:text-primary">
            {children}
        </motion.button>

    )
}