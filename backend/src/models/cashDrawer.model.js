import pool from "../database/connection.js";

export async function createCashDrawer(gymId, userId){

    const startingCash = 0;
    const [result] = await pool.query(`INSERT INTO cash_drawer (starting_cash, user_id, gym_id)
    VALUES (?, ?, ?)`, [startingCash, userId, gymId])
    
    return result;
    
}