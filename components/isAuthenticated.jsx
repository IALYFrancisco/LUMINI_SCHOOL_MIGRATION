// This component allows to protect routes by not authenticated users

import { useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";
import Loading from "@/components/loading";
import { toast } from "sonner";

export default function IsAuthenticated({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const toastShown = useRef(false);

  useEffect(() => {
    if (!loading && !user) {
      if (!toastShown.current) {
        toast.info("Vous devez d'abord vous connecter à votre compte.");
        toastShown.current = true;
      }
      router.replace("/authentication/login");
    }
  }, [user, loading, router]);

  if (loading) return <Loading />;

  if (!user) return null;

  return children;
}