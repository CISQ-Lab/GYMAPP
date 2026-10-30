import * as productsModel from "../models/products.model.js"
import fs from 'fs'

export async function createNewProduct(req, res, next) {

    const userId = req.user.id;
    const { gymId, name, description, stock, price, sku } = req.body;
    const photo_path = req.file?.path;
    let response = {
        success: false,
        message: "No se pudo agregar el producto"
    }

    try {
        const data = await productsModel.createNewProduct(name, description, stock, price, sku, gymId, photo_path);

        if (data.affectedRows !== 0) {
            response.success = true;
            response.message = "Producto agregado con Exito!"
        }
        return res.status(200).json(response);
    } catch (error) {
        if (req.file) {
            fs.unlink(req.file.path, (e) => {
                if (e) console.error("No se pudo borrar el archivo físicamente:", e);
                else console.log("Archivo fantasma eliminado correctamente del servidor.");
            })
        }

        next(error)
    }



}

export async function getProducts(req, res, next) {
    const { gymId } = req.params;
    const filters = req.query;

    const validStatus = ["all", "lowStock", "outOfStock"]

    let response = {
        success: false,
        message: "No se encontraron productos"
    }

    try {
        const data = await productsModel.getProducts(gymId, filters);
        if (data.length > 0) {
            response.success = true;
            response.message = "Exito!";
            response.products = data;
        }
        return res.status(200).json(response);
    } catch (error) {
        next(error)
    }
}

export async function getStats(req, res, next) {
    const { gymId } = req.params;
    let response = {
        success: false,
        message: "No se pudieron calcular las stats"
    }

    try {
        const data = await productsModel.getStats(gymId);
        if (data) {
            response.success = true;
            response.message = "Exito!";
            response.stats = data;
        }
        return res.status(200).json(response);
    } catch (error) {
        next(error)
    }
}

export async function search(req, res, next) {
    const { gymId } = req.params;
    const { text } = req.query;
    let response = {
        success: false,
        message: "No se encontraron coincidencias"
    }

    try {
        const data = await productsModel.search(gymId, text);
        if (data.length > 0) {
            response.success = true;
            response.message = "Exito!";
            response.products = data;
        }
        return res.status(200).json(response);
    } catch (error) {
        next(error)
    }
}

export async function sellProduct(req, res, next) {

    const { productId } = req.params;
    const { gymId, CDId } = req.body;
    const userId = req.user.id;

    let response = {
        success: false,
        message: "Error al vender el producto"
    }

    try {
        const data = await productsModel.sellProduct(productId, gymId, CDId, userId);
        if (data) {
            response.success = true;
            response.message = "Exito!"
        }

        return res.status(200).json(response);
    } catch (error) {
        next(error);
    }

}