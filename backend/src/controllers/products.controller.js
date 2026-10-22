import * as productsModel from "../models/products.model.js"

export async function getProducts(req, res, next){
    const {gymId} = req.params;
    let response = {
        success: false,
        message: "No se encontraron productos"
    }

    try {
        const data = await productsModel.getProducts(gymId);
        if(data.length > 0){
            response.success = true;
            response.message = "Exito!";
            response.products = data;
        }
        return res.status(200).json(response);
    } catch (error) {
        next(error)
    }
}

export async function getStats(req, res, next){
    const {gymId} = req.params;
    let response = {
        success: false,
        message: "No se pudieron calcular las stats"
    }

    try {
        const data = await productsModel.getStats(gymId);
        if(data){
            response.success = true;
            response.message = "Exito!";
            response.stats = data;
        }
        return res.status(200).json(response);
    } catch (error) {
        next(error)
    }
}

export async function search(req, res, next){
    const {gymId} = req.params;
    const {text} = req.query;
    let response = {
        success: false,
        message: "No se encontraron coincidencias"
    }

    try {
        const data = await productsModel.search(gymId, text);
        if(data.length > 0){
            response.success = true;
            response.message = "Exito!";
            response.products = data;
        }
        return res.status(200).json(response);
    } catch (error) {
        next(error)
    }
}