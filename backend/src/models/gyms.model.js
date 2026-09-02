import pool from "../database/connection";

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