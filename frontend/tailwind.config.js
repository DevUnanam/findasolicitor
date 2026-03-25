/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f4f8f5",
          100: "#e6f0e8",
          200: "#c9dccd",
          300: "#a6c2ad",
          400: "#6f957b",
          500: "#3d6b4b",
          600: "#2f593d",
          700: "#244733",
          800: "#1b3527",
          900: "#11211a"
        }
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      boxShadow: {
        soft: "0 8px 24px rgba(17, 33, 26, 0.06)"
      }
    },
  },
  plugins: [],
};

