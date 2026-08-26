import * as authModel from "../models/auth.model.js"
import bcrypt from "bcryptjs";
import "dotenv/config";
import jwt from "jsonwebtoken"

export async function login(req, res, next) {
    try {
        const { email, password } = req.body
        const user = await authModel.findUserByEmail(email);
        if (user.length === 0) {
            return res.status(401).json({
                message: "Credenciales incorrectas"
            })
        }

        const validCredentials = await bcrypt.compare(password, user[0].password);

        if (!validCredentials) {
            return res.status(401).json({
                message: "Credenciales incorrectas"
            })
        }

        const payload = {
            id: user[0].id
        }

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "1d"
        })

        return res.json({
            message: "Usuario encontrado",
            token
        })


    } catch (error) {
        next(error);
    }
}

export async function register(req, res, next) {
    try {
        const { email, password, name, surname } = req.body;
        const passwordHashed = await bcrypt.hash(password, 10);
        await authModel.register(name, surname, email, passwordHashed);

        return res.status(201).json({
            message: "Usuario registrado exitosamente"
        })
    }
    catch (error) {
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).json({
                message: "El email ya está registrado"
            });
        }
        next(error);
    }


}