// This component allows to protect routes by not authenticated users

import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";
import Loading from "@/components/loading";
import { toast } from "sonner";

export default function IsAuthenticated({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      toast.info("Vous devez d'abord vous connecter à votre compte.");
      router.replace("/authentication/login");
    }
  }, [user, loading, router]);

  if (loading) return <Loading />;

  if (!user) return <Loading />;

  return children;
}