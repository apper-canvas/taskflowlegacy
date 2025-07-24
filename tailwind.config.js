/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#5B47E0",
          50: "#F2F0FE",
          100: "#E6E1FD",
          200: "#CFC6FB",
          300: "#B5A5F8",
          400: "#9B84F5",
          500: "#5B47E0",
          600: "#4A37C7",
          700: "#3A2A9E",
          800: "#2A1D75",
          900: "#1A114C"
        },
        secondary: {
          DEFAULT: "#8B7FE8",
          50: "#F7F6FE",
          100: "#EFEDFC",
          200: "#DFDBF9",
          300: "#CFC9F5",
          400: "#BFB7F2",
          500: "#8B7FE8",
          600: "#7469D9",
          700: "#5D53CA",
          800: "#463DBB",
          900: "#2F27AC"
        },
        accent: {
          DEFAULT: "#FFB547",
          50: "#FFF8ED",
          100: "#FFF1DB",
          200: "#FFE3B7",
          300: "#FFD593",
          400: "#FFC76F",
          500: "#FFB547",
          600: "#FFA01F",
          700: "#F58C00",
          800: "#C76F00",
          900: "#995200"
        },
        whisper: "#F8F7FD",
        success: "#22C55E",
        warning: "#F59E0B",
        error: "#EF4444",
        info: "#3B82F6"
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Plus Jakarta Sans", "system-ui", "sans-serif"]
      },
      fontSize: {
        "2xs": "0.625rem",
        "xs": "0.75rem",
        "sm": "0.875rem",
        "base": "1rem",
        "lg": "1.125rem",
        "xl": "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem"
      },
      animation: {
        "bounce-in": "bounceIn 0.5s ease-out",
        "slide-out": "slideOut 0.3s ease-in-out forwards",
        "pulse-gentle": "pulseGentle 2s ease-in-out infinite",
        "confetti": "confetti 0.6s ease-out"
      },
      keyframes: {
        bounceIn: {
          "0%": { transform: "scale(0.3)", opacity: "0" },
          "50%": { transform: "scale(1.05)" },
          "70%": { transform: "scale(0.9)" },
          "100%": { transform: "scale(1)", opacity: "1" }
        },
        slideOut: {
          "0%": { transform: "translateX(0)", opacity: "1" },
          "100%": { transform: "translateX(100%)", opacity: "0" }
        },
        pulseGentle: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" }
        },
        confetti: {
          "0%": { transform: "scale(0) rotate(0deg)", opacity: "1" },
          "100%": { transform: "scale(1) rotate(180deg)", opacity: "0" }
        }
      },
      backdropBlur: {
        xs: "2px"
      }
    },
  },
  plugins: [],
}