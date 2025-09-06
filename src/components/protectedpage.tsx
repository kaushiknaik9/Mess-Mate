"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  id: string;
  type: "student" | "admin";
  exp: number;
}

export default function ProtectedPage({
  children,
  allowedType,
}: {
  children: React.ReactNode;
  allowedType: "student" | "admin";
}) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Unauthorized! Please login.");
      router.push("/login");
      return;
    }

    try {
      const decoded: JwtPayload = jwtDecode(token);
      if (decoded.type !== allowedType) {
        alert("Unauthorized! You cannot access this page.");
        localStorage.removeItem("token");
        router.push("/login");
        return;
      }
      setLoading(false);
    } catch (error) {
      console.error("Error checking authentication:", error);
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
  }, [router, allowedType]);

  if (loading) return <p>Loading...</p>;

  return <>{children}</>;
}
