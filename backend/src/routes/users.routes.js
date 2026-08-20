import { Router } from "express";
import pool from "../database/connection.js"

const router = Router();

router.get("/", (req, res) => {
    pool.query("SELECT * FROM users", (e, results) => {
        if (e) {
            console.log(e);
            return res.status(500).json({
                message: "Error al Consultar la Base de Datos"
            })
        }
        else {
            res.json(results);
        }
    })
});

export default router;