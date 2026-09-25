import pool from "../database/connection.js";

export async function getCashDrawer(gymId) {

    const [result] = await pool.query("SELECT * FROM cash_drawer WHERE gym_id = ? AND status = 1 AND CLOSED_AT IS NULL",
        gymId
    )

    return result;
}

export async function createCashDrawer(gymId, userId) {
    const startingCash = 0;
    const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');

    // Pedimos una conexión individual del pool para manejar la transacción
    const connection = await pool.getConnection();

    try {
        // 1. Iniciamos la transacción
        await connection.beginTransaction();

        // 2. Consultamos si ya existe una caja abierta usando 'FOR UPDATE'
        // Esto bloquea cualquier otra petición simultánea para el mismo gymId
        const [existing] = await connection.query(
            `SELECT id FROM cash_drawer 
             WHERE gym_id = ? 
               AND CLOSED_AT IS NULL 
               AND status = 1 
             FOR UPDATE`,
            [gymId]
        );

        // 3. Si se encontró una caja abierta, cancelamos y lanzamos un error controlado
        if (existing.length > 0) {
            await connection.rollback(); // Liberamos el bloqueo
            const error = new Error('Ya existe una caja abierta para este gimnasio.');
            error.code = 'DRAWER_ALREADY_OPEN';
            throw error;
        }

        // 4. Si no hay caja abierta, procedemos a insertar la nueva
        const [result] = await connection.query(
            `INSERT INTO cash_drawer (starting_cash, user_id, gym_id, CREATED_AT) 
             VALUES (?, ?, ?, ?)`,
            [startingCash, userId, gymId, createdAt]
        );

        // 5. Confirmamos los cambios en la base de datos
        await connection.commit();

        return result;

    } catch (error) {
        // En caso de cualquier fallo, deshacemos los cambios
        await connection.rollback();
        throw error;

    } finally {
        // IMPORTANTE: Siempre liberar la conexión devuelta al pool
        connection.release();
    }
}

export async function closeCD(formData) {

    const [result] = await pool.query();
    
}