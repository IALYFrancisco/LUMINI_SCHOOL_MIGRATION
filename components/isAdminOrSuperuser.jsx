import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";
import Loading from "@/components/loading";

export default function IsAdminOrSuperuser({children}) {
    const router = useRouter()
    const { user, loading } = useAuth()

    if(loading) return <Loading/>
    if(user && (user.status === "admin" || user.status === "superuser")) return children
    return router.replace("/dashboard/inscriptions")

}