import pool from "../database/connection.js";

export async function findUserByEmail(email) {
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?",
        [email]
    );

    return rows
}

export async function register(name, surname, email, passwordHashed){
    const [result] = await pool.query("INSERT INTO users (name, surname, email, password) VALUES (?,?,?,?)", 
        [name, surname, email, passwordHashed]
    );

    return result;
}

export async function createNewGym(gymName, userId) {
}