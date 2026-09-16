import "dotenv/config";
import mysql from "mysql2/promise";

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: Number(process.env.DB_PORT),
    dateStrings: true,
    ssl: {
        rejectUnauthorized: false
    }
});

try {
    // Forzamos a que esta sesión específica de MySQL use la hora de Morelia (-06:00)
    await pool.query("SET time_zone = '-06:00';");

    // Probamos de nuevo la hora actual de la BD
    const [rows] = await pool.query("SELECT NOW() AS Hora_Actual, CURDATE() AS Fecha_Actual;");
    console.log("Conectado con éxito. Hora ajustada en BD:", rows[0].Hora_Actual);

} catch (error) {
    console.error("Error al configurar la zona horaria:", error);
}

export default pool;