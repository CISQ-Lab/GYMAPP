import * as GymModel from "../models/gyms.model"

export async function getGymData(req, res, next){
    try{
        const gym = GymModel.getGymData(req.user.id);
        return res.status(200).json({
            message: "Gym Encontrado",
            gym
        })
    }catch(error){
        next(error);
    }
}