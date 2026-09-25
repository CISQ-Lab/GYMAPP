import * as cashDrawerModel from "../models/cashDrawer.model.js"

export async function getCashDrawer(req, res, next) {
    try {

        const { gymId } = req.query;
        const data = await cashDrawerModel.getCashDrawer(gymId);

        if (data.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No hay una caja abierta"
            })
        }

        const caja = data[0];

        return res.status(200).json({
            success: true,
            message: "Caja abierta",
            caja
        })

    } catch (error) {
        next(error);
    }
}

export async function createCashDrawer(req, res, next) {
    try {

        const { gymId } = req.body;
        const userId = req.user.id;

        const data = await cashDrawerModel.createCashDrawer(gymId, userId);
        if (data.affectedRows === 0) {
            return res.status(400).json({
                success: false,
                message: "No se pudo abrir caja, intentalo mas tarde"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Caja abierta",
        })

    } catch (error) {
        if (error.code === 'DRAWER_ALREADY_OPEN') {
            return res.status(409).json({
                success: false,
                message: error.message
            });
        }
        next(error);
    }


}