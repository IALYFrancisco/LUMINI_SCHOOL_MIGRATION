import Sidebar from "@/components/dashboard/sidebar"
import '../../../public/styles/dashboard/dashboard.css'
import { Outlet } from "react-router-dom"
import { useHead } from "@unhead/react"

export default function Dashboard(){

    useHead({
        meta: [
            { name: 'robots', content: 'noindex, nofollow' }
        ]
    })

    return(
        <section id="dashboard-view">
            <Sidebar></Sidebar>
            <section className="sections-container">
                <Outlet/>
            </section>
        </section>
    )
}