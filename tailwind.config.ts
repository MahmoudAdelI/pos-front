import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class", "class"],
  theme: {
    extend: {
      boxShadow: {
        wrapper: "0 0 0 100vmax rgba(0, 0, 0, 0.5)", // Solid shadow extending to full screen
      },
      colors: {
        Primary: "var(--primary)",
        Bg: "var(--bg)",
        Fg: "var(--fg)",
        form: "var(--form)",
        PrimaryTextColor: "var(--primaryTextColor)",
        SecondaryTextColor: "var(--secondaryTextColor)",
        Icons: "var(--icons)",
        OutlineColor: "var(--outlineColor)",
        Alert: "var(--alert)",
        navBorder: "var(--navBorder)",
        navBackground: "var(--navBackground)",
        label: "var(--label)",
        highlight: "var(--highlight)",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        buttonPending: "var(--buttonPending)",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-motion"), require("tailwindcss-animate")],
} satisfies Config;
