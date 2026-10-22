import pool from "../database/connection.js"

export async function getProducts(gymId) {

    const [result] = await pool.query("SELECT * FROM products WHERE gym_id = ? ", [gymId])
    return result;
}

export async function getStats(gymId) {


    try {
        const [result] = await pool.query(`
            SELECT 
                SUM(1) AS total,
                ROUND(SUM(price * stock), 2) AS totalValue,
                SUM(CASE WHEN stock <= 5 THEN 1 ELSE 0 END) AS lowStock,
                SUM(CASE WHEN stock = 0 THEN 1 ELSE 0 END) AS outOfStock
            FROM products 
            WHERE gym_id = ?
        `, [gymId]);

        // MySQL nos regresa directamente un objeto con las columnas calculadas
        return {
            total: result[0].total || 0,
            totalValue: result[0].totalValue || 0,
            lowStock: result[0].lowStock || 0,
            outOfStock: result[0].outOfStock || 0
        };

    } catch (error) {
        throw error;
    }


}

export async function search(gymId, text) {
    const searchTerm = `%${text}%`;

    const [result] = await pool.query(`SELECT * FROM products WHERE (name LIKE ? 
        OR sku LIKE ?) AND gym_id = ? LIMIT 6`, [searchTerm, searchTerm, gymId])

    return result
}