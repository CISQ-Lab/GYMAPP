import * as cashDrawerModel from "../models/cashDrawer.model"

export async function createCashDrawer(req, res, next) {
    try {

        const data = await cashDrawerModel.createCashDrawer();
        if(data.length === 0){
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
        next(error);
    }


}