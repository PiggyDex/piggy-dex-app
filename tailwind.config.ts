import { type Config } from "tailwindcss";

const config: Config = {
  content: {
    relative: true, files: [
      "./src/**/*.{js,ts,jsx,tsx}",
    ]
  },
  corePlugins: {
    preflight: false,
  },
  important: '#app',
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        md: "2rem",
      },
      screens: {
        "2xl": "1440px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        textLight: "hsl(var(--text-light))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        navbar: {
          DEFAULT: "rgb(var(--navbar-background))",
          foreground: "hsl(var(--navbar-foreground)",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          50: "rgb(var(--primary-50))",
          100: "rgb(var(--primary-100))",
          200: "rgb(var(--primary-200))",
          300: "rgb(var(--primary-300))",
          400: "rgb(var(--primary-400))",
          500: "rgb(var(--primary-500))",
          600: "rgb(var(--primary-600))",
          700: "rgb(var(--primary-700))",
          800: "rgb(var(--primary-800))",
          900: "rgb(var(--primary-900))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        success: {
          DEFAULT: "rgb(var(--success))",
          50: "rgb(var(--success-50))",
          100: "rgb(var(--success-100))",
          200: "rgb(var(--success-200))",
          300: "rgb(var(--success-300))",
          400: "rgb(var(--success-400))",
          500: "rgb(var(--success-500))",
          600: "rgb(var(--success-600))",
          700: "rgb(var(--success-700))",
          800: "rgb(var(--success-800))",
          900: "rgb(var(--success-900))",
        },
        info: {
          DEFAULT: "rgb(var(--info))",
          50: "rgb(var(--info-50))",
          100: "rgb(var(--info-100))",
          200: "rgb(var(--info-200))",
          300: "rgb(var(--info-300))",
          400: "rgb(var(--info-400))",
          500: "rgb(var(--info-500))",
          600: "rgb(var(--info-600))",
          700: "rgb(var(--info-700))",
          800: "rgb(var(--info-800))",
          900: "rgb(var(--info-900))",
        },
        warning: {
          DEFAULT: "rgb(var(--warning))",
          50: "rgb(var(--warning-50))",
          100: "rgb(var(--warning-100))",
          200: "rgb(var(--warning-200))",
          300: "rgb(var(--warning-300))",
          400: "rgb(var(--warning-400))",
          500: "rgb(var(--warning-500))",
          600: "rgb(var(--warning-600))",
          700: "rgb(var(--warning-700))",
          800: "rgb(var(--warning-800))",
          900: "rgb(var(--warning-900))",
        },
        error: {
          DEFAULT: "rgb(var(--error))",
          50: "rgb(var(--error-50))",
          100: "rgb(var(--error-100))",
          200: "rgb(var(--error-200))",
          300: "rgb(var(--error-300))",
          400: "rgb(var(--error-400))",
          500: "rgb(var(--error-500))",
          600: "rgb(var(--error-600))",
          700: "rgb(var(--error-700))",
          800: "rgb(var(--error-800))",
          900: "rgb(var(--error-900))",
        },
        neutral: {
          DEFAULT: "rgb(var(--neutral))",
          50: "rgb(var(--neutral-50))",
          100: "rgb(var(--neutral-100))",
          200: "rgb(var(--neutral-200))",
          300: "rgb(var(--neutral-300))",
          400: "rgb(var(--neutral-400))",
          500: "rgb(var(--neutral-500))",
          600: "rgb(var(--neutral-600))",
          700: "rgb(var(--neutral-700))",
          800: "rgb(var(--neutral-800))",
          900: "rgb(var(--neutral-900))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        "gradient-153": "linear-gradient(153deg, var(--tw-gradient-stops))",
        "gradient-132": "linear-gradient(132deg, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
