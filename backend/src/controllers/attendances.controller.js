import * as attendancesModel from "../models/attendances.model.js"

export async function checkAssistance(req, res, next){

    const {memberId} = req.params;
    const { gymId } = req.body;
    try{
        const result = await attendancesModel.checkAssistance(memberId, gymId);
        return res.status(200).json(result);
    }
    catch(error){
        next(error);
    }
    

}