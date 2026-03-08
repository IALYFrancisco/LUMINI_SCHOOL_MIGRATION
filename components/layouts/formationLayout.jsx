import { useHead } from "@unhead/react"
import { Outlet } from "react-router-dom"

export default function Formations(){

    useHead({
        title: 'Formations - Dashboard | LUMINI School'
    })

    return(
        <>
            <h2>Formations</h2>
            <Outlet/>
        </>
    )
}