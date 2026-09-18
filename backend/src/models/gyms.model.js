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
        "SELECT id, name, logo_path FROM gyms WHERE id = ?",
        [gymId]
    );

    if (gymRows.length === 0) {
        return null;
    }

    return gymRows[0];
}

export async function getMembers(id){
    const [members] = await pool.query('SELECT * FROM members WHERE gym_id = ?',
        id
    ) 
    return members;
}

export async function addNewMember(name, surname, membership_id, phone, email, photo_pat, gymId){

    const [data] = await pool.query("SELECT durationDays FROM plans WHERE id = ?",
        membership_id
    )

    const days = data[0].durationDays;

    const [result] = await pool.query(`INSERT INTO members 
        (name, surname, membership_id, membership_start, membership_end, phone, email, photo_pat, gym_id) VALUES 
        (?, ?, ?, CURDATE(), DATE_ADD(CURDATE(), INTERVAL ? DAY), ?, ?, ?, ?)`,
       [name, surname, membership_id, days, phone, email, photo_pat, gymId] 
    )
    return result;
}

export async function getPlans(gymId, active) {

    let query = "SELECT * FROM plans WHERE gym_id = ?";
    const params = [gymId];

    if(active){
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