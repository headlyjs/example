import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "accent-1": "#FAFAFA",
        "accent-2": "#EAEAEA",
        "accent-7": "#333",
        success: "#0070f3",
        cyan: "#79FFE1",
        primary: "#1E547A",
        "primary-50": "#D4E1EB",
        "primary-200": "#A8C3D6",
        "primary-600": "#1B4A6B",
        "primary-700": "#173F5C",
        "blue-800": "#1E547A",
        "blue-700": "#173F5C",
        "gray-100": "#F2F4F7",
        "gray-300": "#D0D5DD",
        "gray-500": "#667085",
        "gray-900": "#101828",
        "pink-50": "#FDF2FA",
        "pink-700": "#C11574",
      },
    },
  },
  plugins: [],
} satisfies Config;
