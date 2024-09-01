import { formatDate } from '../hooks/formatDate';

export function getDisplayDate(date) {
    // Captura a data de hoje e de amanhã com base no fuso horário local
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    const todayStr = today.toLocaleDateString('sv-SE'); // "sv-SE" usa o formato "YYYY-MM-DD"
    const tomorrowStr = tomorrow.toLocaleDateString('sv-SE');
    const selectedDateStr = date;

    if (selectedDateStr === todayStr) {
        return "hoje";
    } else if (selectedDateStr === tomorrowStr) {
        return "amanhã";
    } else {
        return formatDate(date); // Formata a data no padrão desejado
    }
}
