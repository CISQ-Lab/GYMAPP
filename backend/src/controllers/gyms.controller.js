import * as GymModel from "../models/gyms.model.js"

export async function getGymData(req, res, next){
    try{
        const gym = await GymModel.getGymData(req.user.id);
        if(gym === null){
            return res.status(404).json({
                message: "No hay un gimnasio asociado aun"
            })
        }
        return res.status(200).json({
            message: "Gym Encontrado",
            gym
        })
    }catch(error){
        next(error);
    }
}