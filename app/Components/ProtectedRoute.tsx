"use client";

import React, { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();



  useEffect(() => {

    if (localStorage.getItem("userToken") === null) {
      router.replace("/login");
      
    }
  }, [router]);

  return <>{children}</>;
}
