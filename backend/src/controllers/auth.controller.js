import * as authModel from "../models/auth.model.js"

export async function login(req, res){
    try{
        const {email, password} = req.body
        const user = await authModel.findUserByEmail(email);
        if(user.length === 0){
            return res.status(401).json({
                message: "Usuario no encontrado"
            })
        }

        return res.json({
            user: user,
            message: "Usuario encontrado"
        })

        
    }catch(error){
        console.error(error);

        return res.status(500).json({
            message: "Error del servidor"
        })
    }
}