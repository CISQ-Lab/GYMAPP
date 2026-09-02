import pool from "../database/connection.js";

export async function me(id) {

    let hasGym = false;
    
    const [rows] = await pool.query("SELECT name, surname, email FROM users WHERE id = ?", [id])
    if(rows.length === 0){
        return null;
    }
    const [staffRows] = await pool.query("SELECT * FROM staff WHERE user_id = ?", 
        [id]
    )

    hasGym = staffRows.length > 0;

    rows[0].hasGym = hasGym;
    return rows;
}