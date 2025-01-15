import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        Primary: "var(--primary)",
        Bg: "var(--bg)",
        Fg: "var(--fg)",
        PrimaryTextColor: "var(--primaryTextColor)",
        SecondaryTextColor: "var(--secondaryTextColor)",
        Icons: "var(--icons)",
        OutlineColor: "var(--outlineColor)",
        Alert: "var(--alert)",
        navBorder: "var(--navBorder)",
        navBackground: "var(--navBackground)",
        label: "var(--label)",
        highlight: "var(--highlight)",
      },
    },
  },
  plugins: [require("tailwindcss-motion")],
} satisfies Config;
