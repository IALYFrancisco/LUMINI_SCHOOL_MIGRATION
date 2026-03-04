// This component allows to protect routes by authenticated users

import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Loading from "./loading";

export default function IsNotAuthenticated({children}) {
    const { user, loading } = useAuth()

    if(loading) return <Loading/>
    if(user) return <Navigate to="/dashboard" replace/>
    return children

}