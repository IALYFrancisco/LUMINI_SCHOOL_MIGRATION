import Head from "next/head"
import IsAdminOrSuperuser from "../isAdminOrSuperuser"

export default function FormationLayout({children}){
    return(
        <IsAdminOrSuperuser>
            <Head>
                <title>Formations - Dashboard | LUMINI School</title>
            </Head>
            <h2>Formations</h2>
            {children}
        </IsAdminOrSuperuser>
    )
}