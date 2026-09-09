import pool from "../database/connection.js";

export async function getGymData(userId) {

    const [staffRows] = await pool.query(
        "SELECT gym_id FROM staff WHERE user_id = ?",
        [userId]
    );

    if (staffRows.length === 0) {
        return null;
    }

    const gymId = staffRows[0].gym_id;

    const [gymRows] = await pool.query(
        "SELECT name, logo_path FROM gyms WHERE id = ?",
        [gymId]
    );

    if (gymRows.length === 0) {
        return null;
    }

    return gymRows[0];
}

export async function addPlan(userId, name, description, price) {
    const [staffRows] = await pool.query(
        "SELECT gym_id FROM staff WHERE user_id = ?",
        [userId]
    );

    if (staffRows.length === 0) {
        return null;
    }

    const gymId = staffRows[0].gym_id;

    const [result] = await pool.query("INSERT INTO plans (name, description, price, gym_id) VALUES (?,?,?,?)",
        [name, description, price, gymId]
    );

    return result.insertId
}