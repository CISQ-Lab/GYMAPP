import * as attendancesModel from "../models/attendances.model.js"

export async function checkAssistance(req, res, next) {

    const { memberId } = req.params;
    const { gymId } = req.body;
    try {
        const result = await attendancesModel.checkAssistance(memberId, gymId);
        return res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }


}

export async function attendancesToday(req, res, next) {

    const { type, gymId } = req.query;

    try {
        if (type === "count") {
            const result = await attendancesModel.countAttendancesToday(gymId);
            if (result !== undefined && result !== null) {
                return res.status(200).json({
                    success: true,
                    message: `Se encontraron ${result} asistencias hoy`,
                    num: result
                })
            }

        }
        else if (type === "log") {
            const result = await attendancesModel.ultimateAttendancesToday(gymId);
            if (result.length !== 0) {
                return res.status(200).json({
                    success: true,
                    message: "Ultimos registros encontrados!",
                    attendances: result
                })
            }



        }
        else if (type === "all") {

            const result = await attendancesModel.attendancesToday(gymId);
            if (result.length !== 0) {
                return res.status(200).json({
                    success: true,
                    message: "Se encontraron los registros de hoy!",
                    attendances: result
                })
            }

        }
        else {

            return res.status(200).json({
                success: false,
                message: "Algo salio mal, revisa tu consulta"
            })

        }

        return res.status(200).json({
                success: false,
                message: "No se encuentran asistencias hoy"
            })

    } catch (error) {
        next(error)
    }

}