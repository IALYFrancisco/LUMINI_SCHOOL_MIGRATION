import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";
import Loading from "@/components/loading";
import { useEffect } from "react";

export default function IsAdminOrSuperuser({children}) {
    const { user, loading } = useAuth()
    const router = useRouter()

    useEffect(()=>{
        if(!loading && user && (user.status === "admin" || user.status === "superuser")) return children
    }, [children, loading, user])
    if(loading) return <Loading/>
    return router.replace("/dashboard/inscriptions")
}