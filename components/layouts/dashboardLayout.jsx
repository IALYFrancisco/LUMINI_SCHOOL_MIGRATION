import Sidebar from "@/components/dashboard/sidebar"
import { useAuth } from "@/contexts/AuthContext"
import Head from "next/head"

import Loading from "../loading"

export default function Dashboard({children}){
    const { user } = useAuth()
    if(!user) return <Loading/>
    else return(
        <>
            <Head>
                <meta name="robots" content="noindex, nofollow" key="robots" />
            </Head>
            <section id="dashboard-view">
                <Sidebar></Sidebar>
                <section className="sections-container">
                    {children}
                </section>
            </section>
        </>
    )
}