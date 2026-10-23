import pool from "../database/connection.js";
import bcrypt from "bcryptjs";

export async function findUserByEmail(email) {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?",
        [email]
    );

    return rows
}

export async function confirmPassword(userId, password) {

    const [result] = await pool.query("SELECT password FROM users WHERE id = ?",
        [userId]
    )
    if(result.length !== 0){
        const validPassword = await bcrypt.compare(password, result[0].password);
        return validPassword;
    }
    
}

export async function register(name, surname, email, passwordHashed) {
    const [result] = await pool.query("INSERT INTO users (name, surname, email, password) VALUES (?,?,?,?)",
        [name, surname, email, passwordHashed]
    );

    return result.insertId
}

export async function registerGym(gymName, logoPath, userId) {

    const connection = await pool.getConnection();

    try {
        await connection.beginTransaction();

        const [result] = await connection.query(
            "INSERT INTO gyms (name, logo_path) VALUES (?, ?)",
            [gymName, logoPath]
        );

        await connection.query(
            "INSERT INTO staff (gym_id, user_id, role) VALUES (?, ?, ?)",
            [result.insertId, userId, "admin"]
        );

        await connection.commit();

        return result.insertId;

    } catch (error) {
        await connection.rollback();
        throw error;

    } finally {
        connection.release();
    }

}