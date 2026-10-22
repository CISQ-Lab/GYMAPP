import * as membersModel from "../models/members.model.js"

export async function getMembers(req, res, next) {
    const { gymId } = req.params;
    const filters = req.query;
    if(!filters.status) filters.status = "all";
    const allowedStatus = ['all', 'active', 'finished', 'notFinished', 'toFinish', 'newsAtMonth', 'notActive']
    if (!allowedStatus.includes(filters.status)) {
        return res.status(400).json({
            success: false,
            message: "Filtro no valido"
        })
    }

    try {

        const data = await membersModel.getMembers(gymId, filters);
        if(data.length === 0){
            return res.status(200).json({
                success: false,
                message: "No se encontraron usuarios"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Exito!",
            members: data
        });

    } catch (error) {
        next(error);
    }   

}

export async function getMembersRecently(req, res, next) {
    const { gymId } = req.params;


    try {
        const data = await membersModel.getMembersRecently(gymId);

        if (data.length !== 0) {
            return res.status(200).json({
                success: true,
                message: "Exito!",
                members: data
            });
        }

        return res.status(200).json({
            success: false,
            message: "No se encontraron usuarios"
        });

    } catch (error) {
        next(error);
    }

}

export async function search(req, res, next) {

    const { gymId } = req.params;
    const { text } = req.query;

    let response = {
        success: false,
        message: "No se encontraron usuarios"
    }

    try {
        const data = await membersModel.search(gymId, text);
        if (data.length !== 0) {
            response = {
                success: true,
                message: "Exito!",
                members: data
            }
        }

        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }

}

export async function getStats(req, res, next) {
    const { gymId } = req.params;

    try {
        let response = {
            success: false,
            message: "Error!",
        }

        const data = await membersModel.getStats(gymId);
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