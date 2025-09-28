import type { Config } from "tailwindcss";
import tailwindAnimate from 'tailwindcss-animate';

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
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
        // OrbIT Labs color system
        "orbit-purple": "hsl(var(--orbit-purple))",
        "orbit-purple-glow": "hsl(var(--orbit-purple-glow))",
        "orbit-dark": "hsl(var(--orbit-dark))",
        "orbit-dark-lighter": "hsl(var(--orbit-dark-lighter))",
        "orbit-text-primary": "hsl(var(--orbit-text-primary))",
        "orbit-text-muted": "hsl(var(--orbit-text-muted))",
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        "gradient-purple": "var(--gradient-purple)",
        "gradient-purple-glow": "var(--gradient-purple-glow)",
      },
      boxShadow: {
        "purple": "var(--shadow-purple)",
        "purple-intense": "var(--shadow-purple-intense)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        "spin-slow": {
          from: {
            transform: "rotate(0deg)",
          },
          to: {
            transform: "rotate(360deg)",
          },
        },
        "spin-reverse": {
          from: {
            transform: "rotate(0deg)",
          },
          to: {
            transform: "rotate(-360deg)",
          },
        },
        "suck-in": {
          "0%": {
            transform: "scale(1) rotate(0deg)",
            opacity: "0.7",
          },
          "50%": {
            transform: "scale(0.8) rotate(180deg)",
            opacity: "1",
          },
          "100%": {
            transform: "scale(0) rotate(360deg) translate(50vw, 50vh)",
            opacity: "0",
          },
        },
        "scroll-left": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "spin-slow": "spin-slow 20s linear infinite",
        "spin-reverse": "spin-reverse 15s linear infinite",
        "suck-in": "suck-in 8s linear infinite",
        "scroll-left": "scroll-left 20s linear infinite",
      },
    },
  },
  plugins: [tailwindAnimate],
} satisfies Config;
