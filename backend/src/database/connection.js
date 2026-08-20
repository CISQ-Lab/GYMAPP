import "dotenv/config";
import mysql from "mysql2";

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
});


connection.connect((error) => {
    if (error) {
        console.error("Error al conectar con MySQL:", error);
        return;
    }

    console.log("Conectado a MySQL");
});

export default connection;