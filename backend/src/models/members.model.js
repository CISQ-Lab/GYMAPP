import pool from "../database/connection.js";

export async function getMembers(gymId, filters) {

    let query = "SELECT * FROM members WHERE gym_id = ? ";
    const { status, membership } = filters;
    let params = [gymId];

    switch (status) {

        case ('active'):
            query += "AND isActive = 1 ";
            break;
        case ('notActive'):
            query += "AND isActive = 0 ";
            break;
        case ('toFinish'):
            query += "AND DATEDIFF(membership_end, CURRENT_DATE()) < 5 AND membership_end > CURRENT_DATE() "
            break;
        case ('finished'):
            query += "AND (membership_status = 0 OR CURRENT_DATE() > membership_end) "
            break;
        case ('notFinished'):
            query += "AND (membership_status = 1 OR CURRENT_DATE() < membership_end) "
            break;
        case ('newsAtMonth'):
            query += "AND MONTH(CREATED_AT) = MONTH(CURDATE()) AND YEAR(CREATED_AT) = YEAR(CURDATE()) "
            break;
    }

    if (membership) {
        query += "AND membership_id = ?";
        params.push(membership);
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

export async function search(gymId, text) {

    const searchTerm = `%${text}%`;

    const [result] = await pool.query(`SELECT * FROM members WHERE (CONCAT(name, ' ', surname) LIKE ? 
        OR phone LIKE ? OR email LIKE ?) AND gym_id = ? LIMIT 8`, [searchTerm, searchTerm, searchTerm, gymId])

    return result
}

export async function getStats(gymId) {
    try {
        const [result] = await pool.query(`
            SELECT 
                SUM(CASE WHEN isActive = 1 THEN 1 ELSE 0 END) AS total,
                SUM(CASE WHEN DATEDIFF(membership_end, CURRENT_DATE()) < 5 AND membership_end >= CURRENT_DATE() THEN 1 ELSE 0 END) AS toFinish,
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
export async function renewMembership(membershipId, memberId, gymId, userId, CDId) {

    const [membership] = await pool.query("SELECT durationDays, price, name FROM plans WHERE id = ? AND gym_id = ?", [membershipId, gymId])
    if (!membership.length) throw new Error("El plan seleccionado no existe.");
    const days = membership[0].durationDays;
    const price = membership[0].price;
    const name = membership[0].name;

    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        await connection.query("SET time_zone = '-06:00'");
        await connection.query(`UPDATE members SET membership_id = ?, membership_start = CURDATE(),
            membership_end = DATE_ADD(GREATEST(membership_end, CURDATE()), INTERVAL ? DAY), membership_status = 1 
            WHERE id = ? AND gym_id = ? AND isActive = 1`, [membershipId, days, memberId, gymId]);

        const [member] = await connection.query("SELECT * FROM members WHERE id = ? AND gym_id = ?", [memberId, gymId])
        if (!member.length) throw new Error("El socio no existe.");
        const memberName = member[0].name + ' ' + member[0].surname;
        const concept = `Renovación de membresia ${name} de ${memberName}`

        await connection.query(`INSERT INTO transactions 
            (type, amount, concept, CREATED_AT, user_id, gym_id, cash_drawer_id) VALUES
            ('ingreso', ?, ? , NOW(), ?, ?, ?)`, [price, concept, userId, gymId, CDId])

        await connection.query(`UPDATE cash_drawer SET ending_cash_expected = ending_cash_expected + ? WHERE id = ? AND gym_id = ? and status = 1`,
            [price, CDId, gymId]
        )

        await connection.commit();
        return member;
    } catch (error) {
        await connection.rollback();
        throw (error);
    }
    finally {
        connection.release();
    }

}