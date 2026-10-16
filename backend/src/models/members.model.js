import pool from "../database/connection.js";

    export async function getMembers(gymId, filters) {

        let query = "SELECT * FROM members WHERE gym_id = ? ";
        let params = [gymId];

        if(Object.keys(filters).length !== 0){


            if(filters.active){
                query += "AND isActive = ?";
                params.push(filters.active)
            }
            if('toFinish' in filters){
                query += "AND DATEDIFF(membership_end, CURRENT_DATE()) < 5 AND membership_end > CURRENT_DATE() "
            }
            if('finished' in filters){
                query += "AND (membership_status = 0 OR CURRENT_DATE() > membership_end) "
            }
            if('notFinished' in filters){
                query += "AND (membership_status = 1 OR CURRENT_DATE() < membership_end) "
            }
            if('newsAtMonth' in filters){
                query += "AND MONTH(CREATED_AT) = MONTH(CURDATE()) AND YEAR(CREATED_AT) = YEAR(CURDATE()) "
            }
        }

        const [result] = await pool.query(query, params);
        return result;
    
    }

export async function membersToFinish(gymId) {

    const [result] = await pool.query(`SELECT COUNT(*) AS num FROM members WHERE gym_id = ?
        AND DATEDIFF(membership_end, CURRENT_DATE()) <= 5`, [gymId]);

    return result[0].num;

}

export async function getMembersRecently(gymId) {
    const [result] = await pool.query(`SELECT * FROM members WHERE gym_id = ? ORDER BY id DESC LIMIT 4`, [gymId]);
    return result;
}

export async function search(gymId, text){

    const searchTerm = `%${text}%`;

    const [result] = await pool.query(`SELECT * FROM members WHERE (CONCAT(name, ' ', surname) LIKE ? 
        OR phone LIKE ? OR email LIKE ?) AND gym_id = ? LIMIT 8`, [searchTerm, searchTerm, searchTerm, gymId] )

    return result
}

export async function getStats(gymId) {
    try {
        const [result] = await pool.query(`
            SELECT 
                SUM(CASE WHEN isActive = 1 THEN 1 ELSE 0 END) AS total,
                SUM(CASE WHEN DATEDIFF(membership_end, CURRENT_DATE()) <= 5 AND membership_end >= CURRENT_DATE() THEN 1 ELSE 0 END) AS toFinish,
                SUM(CASE WHEN membership_status = 0 OR membership_end < CURDATE() THEN 1 ELSE 0 END) AS finished,
                SUM(CASE WHEN MONTH(CREATED_AT) = MONTH(CURDATE()) AND YEAR(CREATED_AT) = YEAR(CURDATE()) THEN 1 ELSE 0 END) AS newsAtMonth
            FROM members 
            WHERE gym_id = ?
        `, [gymId]);

        // MySQL nos regresa directamente un objeto con las columnas calculadas
        return {
            total: result[0].total || 0,
            toFinish: result[0].toFinish || 0,
            finished: result[0].finished || 0,
            newsAtMonth: result[0].newsAtMonth || 0
        };

    } catch (error) {
        throw error;
    }
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