import pool from "../database/connection.js"

export async function createNewProduct(name, description, stock, price, sku, gymId, photo_path) {
    const [result] = await pool.query(
        `INSERT INTO products (name, description, stock, price, photo_path, sku, isActive, gym_id) 
         VALUES (?, ?, ?, ?, ?, ?, 1, ?)`,
        [
            name?.trim() || null,
            description?.trim() || null,
            Number(stock) || 0,
            Number(price) || 0.00,
            photo_path?.trim() || null,
            sku?.trim() || null,
            gymId
        ]
    );

    return result;
}

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

    if (filters.text) {
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

export async function sellProduct(productId, gymId, CDId, userId) {
    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        await connection.execute(`SET time_zone = '-06:00'`);

        const [product] = await connection.execute(`SELECT stock, price, name FROM products WHERE id = ? AND gym_id = ? FOR UPDATE`, [productId, gymId])
        if (product.length === 0) {
            throw new Error('El producto no existe.');
        }
        if (product[0].stock <= 0) {
            throw new Error("No hay stock suficiente");
        }

        await connection.execute(`UPDATE products SET stock = stock - 1 WHERE id = ? AND gym_id = ?`, [productId, gymId]);

        const concept = `Venta de 1 ${product[0].name}`

        await connection.execute(`INSERT INTO transactions (type, amount, concept, user_id, gym_id, cash_drawer_id, selled) VALUES
            ('ingreso', ?, ?, ?, ?, ?, 'product')`, [product[0].price, concept, userId, gymId, CDId]);

        await connection.execute(`UPDATE cash_drawer SET ending_cash_expected = ending_cash_expected + ? WHERE id = ? AND gym_id = ?`, [product[0].price, CDId, gymId])

            await connection.commit();
            return true

    } catch (error) {
        await connection.rollback();
        throw error;
    }
    finally {
        connection.release();
    }


}