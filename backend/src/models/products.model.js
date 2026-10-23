import pool from "../database/connection.js"

export async function getProducts(gymId, filters) {

    let query = "SELECT * FROM products WHERE gym_id = ? ";
    let params = [gymId]

    if (filters.status) {
        const status = filters.status;

        switch (status) {
            case ("outOfStock"):
                query += "AND stock = 0 ";
                break;
            case ("lowStock"):
                query += "AND (stock <= 5 AND stock > 0) ";
                break;
        }
    }

    if(filters.text){
        const searchTerm = `%${filters.text}%`;

        query += "AND (name LIKE ? OR sku LIKE ?) ";
        params.push(searchTerm);
        params.push(searchTerm);

    }

    if (filters.orderBy) {
        const orderBy = filters.orderBy;

        switch (orderBy) {
            case ("AD"):
                query += "ORDER BY name DESC ";
                break;
            case ("AA"):
                query += "ORDER BY name ASC ";
                break;
            case ("PD"):
                query += "ORDER BY price DESC ";
                break;
            case ("PA"):
                query += "ORDER BY price ASC ";
                break;
            case ("SD"):
                query += "ORDER BY stock DESC ";
                break;
            case ("SA"):
                query += "ORDER BY stock ASC ";
                break;
        }
    }

    const [result] = await pool.query(query, params);
    return result;
}

export async function getStats(gymId) {


    try {
        const [result] = await pool.query(`
            SELECT 
                SUM(1) AS total,
                ROUND(SUM(price * stock), 2) AS totalValue,
                SUM(CASE WHEN stock <= 5 AND stock > 0 THEN 1 ELSE 0 END) AS lowStock,
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
        OR sku LIKE ?) AND gym_id = ?`, [searchTerm, searchTerm, gymId])

    return result
}