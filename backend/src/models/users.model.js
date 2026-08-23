import pool from "../database/connection.js";

export async function me(id) {
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id])
    return rows;
}