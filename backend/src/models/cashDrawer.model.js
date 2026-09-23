import pool from "../database/connection";

export async function createCashDrawer(data){

    const [result] = pool.query(`INSERT INTO cash_drawer (starting_cash, user_id, gym_id)
    VALUES (?, ?, ?)`, [startingCash, userId, gymId])
    
    return result;
    
}