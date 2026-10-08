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