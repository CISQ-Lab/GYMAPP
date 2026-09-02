import pool from "../database/connection.js";

export async function findUserByEmail(email) {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?",
        [email]
    );

    return rows
}

export async function register(name, surname, email, passwordHashed) {
    const [result] = await pool.query("INSERT INTO users (name, surname, email, password) VALUES (?,?,?,?)",
        [name, surname, email, passwordHashed]
    );

    return result.insertId
}

export async function registerGym(gymName, logoPath, userId) {

    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        const [result] = await connection.query(
            "INSERT INTO gyms (name, logo_path) VALUES (?, ?)",
            [gymName, logoPath]
        );

        await connection.query(
            "INSERT INTO staff (gym_id, user_id, role) VALUES (?, ?, ?)",
            [result.insertId, userId, "admin"]
        );

        await connection.commit();

        return result.insertId;

    } catch (error) {
        await connection.rollback();
        throw error;

    } finally {
        connection.release();
    }

}