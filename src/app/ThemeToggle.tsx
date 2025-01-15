"use client";
import { useTheme } from "next-themes";
import React from "react";
import { BsMoonStars } from "react-icons/bs";
import { FiSun } from "react-icons/fi";

const ThemeToggle = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };
  return (
    <button
      onClick={toggleTheme}
      className="rounded-full p-3 transition-colors hover:bg-Fg hover:text-Icons"
    >
      {resolvedTheme === "dark" ? <BsMoonStars /> : <FiSun />}
    </button>
  );
};

export default ThemeToggle;
