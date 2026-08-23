import * as usersModel from "../models/users.model.js"

export async function getUserData(req, res, next){

    try{
        const user = await usersModel.me(req.user.id);
        return res.status(200).json({
            message: "Usuario autenticado",
            user
        })

    }catch(error){
        next(error);
    }

}