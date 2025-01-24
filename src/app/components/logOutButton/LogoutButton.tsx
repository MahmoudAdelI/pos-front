"use client";

import logout from "@/app/auth/logout";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoIosLogOut } from "react-icons/io";

const Logout = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await logout();
      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <button className="p-2" onClick={handleLogout}>
      <IoIosLogOut />
    </button>
  );
};

export default Logout;
