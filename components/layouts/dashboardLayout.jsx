import Sidebar from "@/components/dashboard/sidebar"
import Head from "next/head"

export default function Dashboard({children}){
    return(
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