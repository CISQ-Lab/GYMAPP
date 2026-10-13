import * as membersModel from "../models/members.model.js"

export async function getStats(req, res, next) {
    const { gymId } = req.params;

    try {
        let response = {
            success: false,
            message: "Error!",
        }

        const data = await membersModel.getStats(gymId);
        console.log(data);
        if (Object.keys(data).length !== 0) {
            response = {
                success: true,
                message: "Exito!",
                stats: data
            }
        }

        return res.status(200).json(response);
    } catch (error) {

        next(error);

    }



}

export async function membersToFinish(req, res, next) {

    const { gymId } = req.params;
    let response = {
        success: false,
        message: "Error al contar los miembros"
    }

    try {

        const result = await membersModel.membersToFinish(gymId);
        if (result !== 0) {
            response = {
                success: true,
                message: "EXITO!",
                num: result
            }
        }

        return res.status(200).json(response);

    } catch (error) {
        next(error);
    }
}