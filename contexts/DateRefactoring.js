export default function DateRefactoring(_date){
    const date  = new Date(_date)
    const pad = (n)=>n.toString().padStart(2, "0")
    return(
        date.getFullYear()+"-"+pad(date.getMonth()+1)+"-"+pad(date.getDate())+"T"+pad(date.getHours())+":"+pad(date.getMinutes())
    )  
}