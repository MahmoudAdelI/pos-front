"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const LogOut = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await axios.post("/api/auth/logout");
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <button className="p3" onClick={handleLogout}>
      Log Out
    </button>
  );
};

export default LogOut;
