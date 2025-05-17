export function formatDate(time, isMonths) {
    const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"]
    const date = new Date(time)

    const formattedDate = `
        ${date.getDate().toString().padStart(2, "0")}/${isMonths ? months[date.getMonth()]: date.getMonth().toString().padStart(2, "0")}/${date.getFullYear().toString()}`;
        
    const formattedTime = `
        ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
        
    return {date: formattedDate, time: formattedTime}
};

export function formatAddress(address){
    const sections = address.split(",");
    const formatted = sections.map(section => section.trim());
    return {
        street: formatted[0],
        neighborhood: formatted[1],
        city: formatted[2],
        state: formatted[3],
}};