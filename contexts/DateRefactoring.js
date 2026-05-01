export default function DateRefactoring(_date){
    const date  = new Date(_date)
    const pad = (n)=>n.toString().padStart(2, "0")
    return(
        date.getFullYear()+"-"+pad(date.getMonth()+1)+"-"+pad(date.getDate())+"T"+pad(date.getHours())+":"+pad(date.getMinutes())
    )  
}

export function FormatDateMG(date){
    return new Intl.DateTimeFormat("fr-FR", {
        timeZone: "Indian/Antananarivo",
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    }).format(new Date(date))
}