// This component allows to protect routes by authenticated users

import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";
import Loading from "@/components/loading";

export default function IsNotAuthenticated({ children }) {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      router.replace("/dashboard");
    }
  }, [user, loading, router]);

  // Pendant la vérification de l'auth
  if (loading) return <Loading />;

  // Si user existe, on bloque l'affichage
  if (user) return <Loading />;

  return children;
}