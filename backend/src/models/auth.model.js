import pool from "../database/connection.js";

export async function findUserByEmail(email) {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?",
        [email]
    );

    return rows
}