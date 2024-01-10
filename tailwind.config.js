/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(93deg, rgba(80, 80, 234, 0.64) 29.87%, rgba(80, 80, 234, 0.93) 67.49%, #5050EA 82.47%)",
        "circle-gradient":
          "radial-gradient(53.07% 53.07% at 50% 48.07%, #FFF 0%, #FFF 47.4%, rgba(80, 80, 234, 0.34) 86.46%, rgba(255, 255, 255, 0.00) 100%)",
        "card-pricing":
          "linear-gradient(85deg, rgba(80, 80, 234, 0.64) 0.72%, rgba(80, 80, 234, 0.93) 73.08%, #5050EA 101.88%)",
        "card-gold": "linear-gradient(180deg, #FFFFE2 0%, #FFF 100%)",
        "overlay-background":
          "linear-gradient(180deg, rgba(80, 80, 234, 0.65) 0%, rgba(80, 80, 234, 0.17) 56.5%, rgba(80, 80, 234, 0.40) 100%)",
        "card-feature":
          "linear-gradient(103deg, #5050EA 5.12%, rgba(80, 80, 234, 0.93) 58.82%, #5050EA 101.02%)",
        "text-light-card-primary":
          "linear-gradient(93deg, rgba(255, 255, 255, 0.64) 1.88%, rgba(255, 255, 255, 0.93) 71.35%, #FFF 98.99%)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      width: {
        "1.5screen": "150vw", // 200% de la largeur de l'écran
        "2screen": "200vw", // 200% de la largeur de l'écran
      },
      height: {
        "1.5screen": "150vh", // 200% de la largeur de l'écran
        "2screen": "200vh", // 200% de la largeur de l'écran
      },
      screens: {
        ipromax: "375px",
        // => @media (min-width: 640px) { ... }
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
