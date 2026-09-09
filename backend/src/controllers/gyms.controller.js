import * as GymModel from "../models/gyms.model.js"

export async function getGymData(req, res, next) {
    try {
        const gym = await GymModel.getGymData(req.user.id);
        if (gym === null) {
            return res.status(404).json({
                message: "No hay un gimnasio asociado aun"
            })
        }
        return res.status(200).json({
            message: "Gym Encontrado",
            gym
        })
    } catch (error) {
        next(error);
    }
}

export async function addPlan(req, res, next) {
    try {

        req.body = req.body.form
        const { name, description, price } = req.body;

        const planId = await GymModel.addPlan(req.user.id, name, description, price);
        if (planId.length === 0) {
            return res.status(400).json({
                message: "No pudo agregarse, intentalo de nuevo"
            })
        }

        return res.status(201).json({
            message: "Plan creado correctamente",
            planId
        })
    } catch (error) {
        next(error);
    }
}