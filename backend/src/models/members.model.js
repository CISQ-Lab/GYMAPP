import pool from "../database/connection.js";

export async function membersToFinish(gymId) {

    const [result] = await pool.query(`SELECT COUNT(*) AS num FROM members WHERE gym_id = ?
        AND DATEDIFF(membership_end, CURRENT_DATE()) <= 5`, [gymId]);

    return result[0].num;

}