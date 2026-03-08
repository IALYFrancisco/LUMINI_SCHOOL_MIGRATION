// This component allows to protect routes by not authenticated users

import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";
import Loading from "@/components/loading";

export default function IsAuthenticated({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/authentication/login");
    }
  }, [user, loading, router]);

  if (loading) return <Loading />;

  if (!user) return null;

  return children;
}