import { Outlet } from "react-router-dom"
import Head from "next/head"

export default function Users(){
    return(
        <>
            <Head>
                <title>Utilisateurs - Dashboard | LUMINI School</title>
            </Head>
            <h2>Utilisateurs</h2>
            <Outlet/>
        </>
    )
}