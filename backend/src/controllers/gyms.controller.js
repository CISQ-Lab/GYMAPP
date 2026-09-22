import * as GymModel from "../models/gyms.model.js"
import fs from "fs"

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

export async function getMembers(req, res, next) {

    try {

        const { id } = req.params;
        const members = await GymModel.getMembers(id)
        if (members.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No se encontraron Miembros"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Miembros encontrados correctamente",
            members
        })
    } catch (error) {
        next(error);
    }
}

export async function addNewMember(req, res, next) {

    if (!req.file) {
        return res.status(400).json({
            success: false,
            message: "Sube una foto del usuario"
        })
    }

    const { name, surname, phone, email, planId, gymId } = req.body;
    const photo_pat = req.file.path;

    try {
        const data = await GymModel.addNewMember(name, surname, planId, phone, email, photo_pat, gymId);
        if (data.affectedRows === 0) return res.status(400).json({
            success: false,
            message: "No fue posible agregar el usuario, intentalo mas tarde"
        })

        return res.status(200).json({
            success: true,
            message: "El usuario fue agregado con exito!!"
        })
    }
    catch (error) {

        fs.unlink(req.file.path, (e) => {
            if (e) console.error("No se pudo borrar el archivo físicamente:", err);
            else console.log("Archivo fantasma eliminado correctamente del servidor.");
        })

        req.body.error = "Este usuario ya esta agregado en la base de datos";
        next(error);
    }

}

export async function getPlans(req, res, next) {
    try {

        const { active } = req.query;
        const { id } = req.params;
        const plans = await GymModel.getPlans(id, active)
        if (plans.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No se encontraron planes"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Planes encontrados correctamente",
            plans
        })
    } catch (error) {
        next(error);
    }
}

export async function getPlan(req, res, next) {

    try {
        const { id } = req.params;
        const plan = await GymModel.getPlan(id);
        if (!plan || plan.length === 0) {
            return res.status(404).json({
                message: "No se encuentra el plan solicitado"
            })
        }

        return res.status(200).json({
            success: true,
            plan
        })
    }
    catch (error) {
        next(error);
    }
}

export async function addPlan(req, res, next) {
    try {

        req.body = req.body.form
        const { name, description, price, duration, gymId } = req.body;

        const planId = await GymModel.addPlan(gymId, name, description, price, duration);
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

export async function updatePlan(req, res, next) {

    const { planId } = req.params;

    req.body = req.body.form;

    const { name, description, price, duration } = req.body

    try {
        const result = await GymModel.updatePlan(name, description, price, duration, planId);
        if (result.affectedRows === 0) {
            return res.status(400).json({
                success: false,
                message: "No se pudo editar, intentalo de nuevo."
            })
        }

        return res.status(200).json({
            success: true,
            message: "Cambios realizados con exito."
        })

    } catch (error) {
        next(error);
    }
}

export async function deletePlan(req, res, next) {
    try {
        const { planId, gymId } = req.body;
        const result = await GymModel.deletePlan(planId, gymId);
        if (result.affectedRows === 0) {
            return res.status(400).json({
                success: false,
                message: "No se pudo eliminar, intentalo de nuevo."
            })
        }

        return res.status(200).json({
            success: true,
            message: "Eliminado con exito."
        })

    } catch (error) {
        next(error);
    }
}

export async function changePlanActive(req, res, next) {
    try {

        const { planId, gymId } = req.body;

        const result = await GymModel.changePlanActive(gymId, planId);
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