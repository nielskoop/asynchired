import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-mobile": "url('/public/hero-bg.png')",
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
      },
      animation: {
        popIn: 'popIn 1s ease-out',
      }
    },
  },
  plugins: [],
} satisfies Config;
