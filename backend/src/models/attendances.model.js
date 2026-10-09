import pool from "../database/connection.js";

export async function checkAssistance(memberId, gymId) {

    const [data] = await pool.query("SELECT name, membership_status, membership_end, isActive FROM members WHERE id = ? AND gym_id = ?", [memberId, gymId]);
    if (data.length === 0) {
        return {
            success: false,
            message: "El socio no existe o no pertenece a este gimnasio"
        }
    }

    let messageInvalid;
    const fechaActual = new Date().toISOString().split('T')[0];

    if (data[0].membership_status === 0 || data[0].membership_end < fechaActual) {
        messageInvalid = "Membresia expirada"
    }
    else if (data[0].isActive === 0) {
        messageInvalid = "Usuario suspendido";
    }

    const status = !messageInvalid ? "valida" : "invalida";

    await pool.query(`INSERT INTO attendances (check_in, status, Motivo_denegacion, member_id, gym_id) VALUES
        (NOW(), ?, ?, ?, ?)`, [status, messageInvalid, memberId, gymId]);

    if (messageInvalid) {
        return { success: false, message: `Acceso denegado: ${messageInvalid}` };
    }

    return { success: true, message: `¡Bienvenido/a, ${data[0].name}!` };


}

export async function countAttendancesToday(gymId) {
    const [result] = await pool.query("SELECT COUNT(*) AS total FROM attendances WHERE gym_id = ? AND DATE(check_in) = CURDATE()",
        gymId
    )

    const num = result[0].total;
    return num;


}

export async function ultimateAttendancesToday(gymId) {

    const [data] = await pool.query(`SELECT TIME(t1.check_in) AS time, t1.status, t2.name, t2.surname
        FROM attendances t1 JOIN members t2
        ON t1.member_id = t2.id
        WHERE t1.gym_id = ? AND DATE(t1.check_in) = CURDATE()
        ORDER BY time DESC LIMIT 5
        `, [gymId])

    return data;

}

export async function attendancesToday(gymId) {

    const [data] = await pool.query(`SELECT TIME(t1.check_in) AS time, t1.status, t2.name, t2.surname
        FROM attendances t1 JOIN members t2
        ON t1.member_id = t2.id
        WHERE t1.gym_id = ? AND DATE(t1.check_in) = CURDATE()
        ORDER BY time DESC
        `, [gymId])


    return data;

}