"use client";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import { PropsWithChildren } from "react";

const ThemeProvider = ({ children }: PropsWithChildren) => {
  return <NextThemeProvider>{children}</NextThemeProvider>;
};

export default ThemeProvider;
