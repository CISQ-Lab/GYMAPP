import "dotenv/config";
import mysql from "mysql2/promise";

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});

try{
    await pool.query("SELECT 1");
    console.log("Conectado a MySQL");
}
catch(error){
    console.error(error);
}

export default pool;