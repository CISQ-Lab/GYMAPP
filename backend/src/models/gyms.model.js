import pool from "../database/connection.js";
import { getLocalDateTime } from "../scripts/getLocalDateTime.js";

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
        "SELECT id, name, logo_path FROM gyms WHERE id = ?",
        [gymId]
    );

    if (gymRows.length === 0) {
        return null;
    }

    return gymRows[0];
}

export async function getMembers(id) {
    const [members] = await pool.query('SELECT * FROM members WHERE gym_id = ?',
        id
    )
    return members;
}

export async function addNewMember(name, surname, membership_id, phone, email, photo_pat, gymId, userId) {

    const connection = await pool.getConnection();
    const localTime = getLocalDateTime();

    try {

        await connection.beginTransaction();

        const [result] = await connection.query("SELECT id FROM cash_drawer WHERE gym_id = ? AND ending_cash IS NULL", gymId); 
        const CDId = result[0].id;

        const [data] = await connection.query("SELECT durationDays, price FROM plans WHERE id = ?",
            membership_id
        )

        const days = data[0].durationDays;
        const price = data[0].price;

        await connection.query(`INSERT INTO members 
        (name, surname, membership_id, membership_start, membership_end, phone, email, photo_pat, gym_id) VALUES 
        (?, ?, ?, CURDATE(), DATE_ADD(CURDATE(), INTERVAL ? DAY), ?, ?, ?, ?)`,
            [name, surname, membership_id, days, phone, email, photo_pat, gymId]
        )

        await connection.query(`INSERT INTO transactions (type, amount, concept, user_id, gym_id, cash_drawer_id, CREATED_AT) VALUES
            (?, ?, ?, ?, ?, ?, ?)`, ["ingreso", price, "Inscripción y primera mensualidad", userId, gymId, CDId, localTime])

        await connection.query(`UPDATE cash_drawer SET ending_cash_expected = ending_cash_expected + ? WHERE id = ?`, [price, CDId]);
        
        await connection.commit();
        return true;

    } catch (error) {
        await connection.rollback();
        throw error;
    }
    finally {
        connection.release()
    }


}

export async function editMember(form) {


    const { formData } = form;
    const { name, surname, membership_id, membership_status, membership_start,
        membership_end, phone, email, photo_pat, isActive, id } = formData;

    const [result] = await pool.query(`UPDATE members SET name = ?, surname = ?, membership_id = ?,
        membership_status = ?, membership_start = ?, membership_end = ?, phone = ?,
        email = ?, photo_pat = ?, isActive = ? WHERE id = ?`,
        [name, surname, membership_id, membership_status, membership_start,
            membership_end, phone, email, photo_pat, isActive, id]);

    return result;
}

export async function getPlans(gymId, active) {

    let query = "SELECT * FROM plans WHERE gym_id = ?";
    const params = [gymId];

    if (active) {
        query = query + " AND isActive = ?";
        params.push(active);
    }


    const [planRows] = await pool.query(query, params);
    return planRows;
}

export async function getPlan(planId) {
    const [planRows] = await pool.query("SELECT * FROM plans WHERE id = ?",
        [planId]
    )

    return planRows[0];
}

export async function addPlan(gymId, name, description, price, durationDays) {

    const [result] = await pool.query("INSERT INTO plans (name, description, price, durationDays, gym_id) VALUES (?,?,?,?, ?)",
        [name, description, price, durationDays, gymId]
    );

    return result.insertId
}

export async function updatePlan(name, description, price, duration, planId) {
    const [result] = await pool.query("UPDATE plans SET name = ?, description = ?, price = ?, durationDays = ? WHERE id = ?",
        [name, description, price, duration, planId]
    );
    return result;
}

export async function deletePlan(planId, gymId) {
    const [result] = await pool.query("DELETE FROM plans WHERE id = ? AND gym_id = ?",
        [planId, gymId]
    );
    return result;
}

export async function changePlanActive(gymId, planId) {

    const [result] = await pool.query("UPDATE plans SET isActive = 1 - isActive WHERE gym_id = ? AND id = ?",
        [gymId, planId]
    );

    return result
}