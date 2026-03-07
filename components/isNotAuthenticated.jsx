// This component allows to protect routes by authenticated users

// import { useEffect } from "react";
// import { useRouter } from "next/router";
// import { useAuth } from "@/contexts/AuthContext";
// import Loading from "@/components/loading";

// export default function IsNotAuthenticated({ children }) {
//   const router = useRouter();
//   const { user, loading } = useAuth();

//   useEffect(() => {
//     if (!loading && user) {
//       router.replace("/dashboard");
//     }
//   }, [user, loading, router]);

//   if (loading) return <Loading />;

//   if (user) return null;

//   return children;
// }


// This component allows to protect routes by authenticated users

import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";
import Loading from "@/components/loading";

export default function IsNotAuthenticated({children}) {
    const router = useRouter()
    const { user, loading } = useAuth()

    if(loading) return <Loading/>
    if(user) return router.push("/dashboard")
    return children

}