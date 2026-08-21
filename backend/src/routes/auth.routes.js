import { Router } from "express";
import pool from "../database/connection.js";

const router = Router();

router.post("/login", (req, res) => {
    const {email, password} = req.body;

    pool.query("SELECT * FROM users WHERE email = ?", [email], (e, r) => {
        if(e){
            console.log(e);
            return res.status(500).json({
                message: "Error en el servidor"
            })
        }
        else if(r.length === 0){
            console.log("Credenciales inavalidas");
            return res.status(401).json({
                message: "Credenciales Invalidas"
            })
        }
        const user = r[0];
        console.log(user);
        res.json({
            user: user,
            message: "Usuario Encontrado"
        })
    })  
})

export default router;