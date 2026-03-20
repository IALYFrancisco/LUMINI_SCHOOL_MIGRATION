import UsersList from "@/components/dashboard/users/user-list"
import Dashboard from "@/components/layouts/dashboardLayout"
import Head from "next/head"

export default function Users(){
    return(
        <Dashboard>
            <Head>
                <title>Utilisateurs - Dashboard | LUMINI School</title>
            </Head>
            <h2>Utilisateurs</h2>
            <UsersList/>
        </Dashboard>
    )
}