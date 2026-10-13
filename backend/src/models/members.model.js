import pool from "../database/connection.js";

export async function membersToFinish(gymId) {

    const [result] = await pool.query(`SELECT COUNT(*) AS num FROM members WHERE gym_id = ?
        AND DATEDIFF(membership_end, CURRENT_DATE()) <= 5`, [gymId]);

    return result[0].num;

}

export async function getStats(gymId) {

    let data = {};
    let result;

    [result] = await pool.query("SELECT COUNT(*) AS total FROM members WHERE gym_id = ? AND isActive = 1", [gymId]);
    data.total = result[0].total;
    [result] = await pool.query(`SELECT COUNT(*) AS total FROM members WHERE gym_id = ?
        AND DATEDIFF(membership_end, CURRENT_DATE()) <= 5`, [gymId]);
    data.toFinish = result[0].total;
    [result] = await pool.query(`SELECT COUNT(*) as total FROM members 
        WHERE gym_id = ? AND (membership_status = 0 OR membership_end < CURDATE())`, [gymId]);
    data.finished = result[0].total;
    [result] = await pool.query(`SELECT COUNT(*) AS total FROM members
        WHERE gym_id = ? 
        AND MONTH(CREATED_AT) = MONTH(CURDATE())
        AND YEAR(CREATED_AT) = YEAR(CURDATE())`, [gymId]);
    data.newsAtMonth = result[0].total;

    return data;
}

export async function getNumToFinishMembers(gymId) {
    const [result] = await pool.query(`SELECT COUNT(*) AS total FROM members WHERE gym_id = ?
        AND DATEDIFF(membership_end, CURRENT_DATE()) <= 5`, [gymId]);
    return result[0].total;
}
export async function getNumFinishedMembers(gymId) {
    const [result] = await pool.query(`SELECT COUNT(*) as total FROM members 
        WHERE gym_id = ? AND (membership_status = 0 OR membership_end < CURDATE())`, [gymId]);
    return result[0].total;
}
export async function getNumNewsAtMonthMembers(gymId) {
    const [result] = await pool.query(`SELECT COUNT(*) AS total FROM members
        WHERE gym_id = ? 
        AND MONTH(CREATED_AT) = MONTH(CURDATE())
        AND YEAR(CREATED_AT) = YEAR(CURDATE())`, [gymId])
    return result[0].total;
}