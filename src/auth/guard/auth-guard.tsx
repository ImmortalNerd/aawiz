"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthContext } from "../hooks/use-auth-context";
import Loading from "@/components/main/loading";
//-------------------------

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { authenticated, loading } = useAuthContext();

  useEffect(() => {
    if (loading) return;

    if (!authenticated) {
      router.replace(`/login?redirect=${pathname}`);
    }
  }, [loading, authenticated, pathname, router]);

  if (loading) return <Loading />;
  if (!authenticated) return null;

  return <>{children}</>;
}
