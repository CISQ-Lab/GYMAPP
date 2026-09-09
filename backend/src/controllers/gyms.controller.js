import Success from "../../../frontend/src/components/messages/success.js";
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

export async function getPlans(req, res, next) {
    try {
        const plans = await GymModel.getPlans(req.user.id)
        if (plans.length === 0) {
            return res.status(404).json({
                message: "No se encontraron planes"
            })
        }

        return res.status(200).json({
            message: "Planes encontrados correctamente",
            plans
        })
    } catch (error) {
        next(error);
    }
}

export async function addPlan(req, res, next) {
    try {

        req.body = req.body.form
        const { name, description, price, duration } = req.body;

        const planId = await GymModel.addPlan(req.user.id, name, description, price, duration);
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

export async function changePlanActive(req, res, next) {
    try {

        const {planId} = req.body;

        const result = await GymModel.changePlanActive(req.user.id, planId);
        console.log(result);
        if (result.length === 0) {
            return res.status(400).json({
                message: "No se pudo cambiar el estado, intenta nuevamente."
            })
        }

        return res.status(200).json({
            success: true,
            message: "Se cambio el estado con exito."
        })
    } catch (error) {
        next(error)
    }
}