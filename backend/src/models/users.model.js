import pool from "../database/connection.js";

export async function me(id) {
    const [rows] = await pool.query("SELECT name, surname, email FROM users WHERE id = ?", [id])
    return rows;
}