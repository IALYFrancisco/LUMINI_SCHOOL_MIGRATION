import UsersList from "@/components/dashboard/users/user-list"
import Head from "next/head"

export default function Users(){
    return(
        <>
            <Head>
                <title>Utilisateurs - Dashboard | LUMINI School</title>
            </Head>
            <h2>Utilisateurs</h2>
            <UsersList/>
        </>
    )
}