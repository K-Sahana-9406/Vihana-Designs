import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          powder: "#8DB9F0",
          lavenderWhite: "#E9E8F8",
          cloud: "#F8F9FC",
          navy: "#18243B",
          navyLight: "#233352",
          mutedLavender: "#C5B8E8",
          ice: "#D6E7FA",
        },
        navy: {
          DEFAULT: "#18243B",
          50: "#F2F5F9",
          100: "#E3E9F2",
          200: "#C4D1E3",
          300: "#9FB3D0",
          400: "#6B88B3",
          500: "#446294",
          600: "#2F4671",
          700: "#233352",
          800: "#18243B",
          900: "#0F1726",
          950: "#090E17",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Playfair Display", "DM Serif Display", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(24, 36, 59, 0.05), 0 2px 6px -1px rgba(24, 36, 59, 0.03)',
        'premium': '0 12px 35px -4px rgba(24, 36, 59, 0.08), 0 4px 12px -2px rgba(24, 36, 59, 0.04)',
        'glow': '0 0 35px -5px rgba(141, 185, 240, 0.35)',
        'card': '0 1px 3px rgba(24, 36, 59, 0.05), 0 10px 30px -10px rgba(141, 185, 240, 0.15)',
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #8DB9F0 0%, #E9E8F8 100%)',
        'gradient-subtle': 'linear-gradient(180deg, #F8F9FC 0%, #E9E8F8 100%)',
        'gradient-hero': 'radial-gradient(ellipse at 50% -20%, #D6E7FA 0%, #F8F9FC 65%, #E9E8F8 100%)',
      },
    },
  },
  plugins: [],
};
export default config;

