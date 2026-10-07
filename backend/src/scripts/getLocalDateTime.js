// Función para obtener la fecha/hora actual exacta de Morelia en formato MySQL ('YYYY-MM-DD HH:MM:SS')
export function getLocalDateTime() {
    return new Intl.DateTimeFormat('sv-SE', {
        timeZone: 'America/Mexico_City',
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    }).format(new Date()).replace(',', '');
}