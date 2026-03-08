import Head from "next/head"

export default function FormationLayout({children}){
    return(
        <>
            <Head>
                <title>Formations - Dashboard | LUMINI School</title>
            </Head>
            <h2>Formations</h2>
            {children}
        </>
    )
}