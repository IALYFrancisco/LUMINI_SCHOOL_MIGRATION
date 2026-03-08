import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Loading from "./loading";

export default function IsAdminOrSuperuser({children}) {
    const { user, loading } = useAuth()

    if(loading) return <Loading/>
    if(user && (user.status === "admin" || user.status === "superuser")) return children
    return <Navigate to="/dashboard/inscriptions" replace/>

}