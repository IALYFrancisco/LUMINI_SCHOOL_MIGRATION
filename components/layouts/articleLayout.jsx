import Head from "next/head"
import IsAdminOrSuperuser from "../isAdminOrSuperuser"

export default function FormationLayout({children}){
    return(
        <IsAdminOrSuperuser>
            <Head>
                <title>Articles - Dashboard | LUMINI School</title>
            </Head>
            <h2>Articles</h2>
            {children}
        </IsAdminOrSuperuser>
    )
}