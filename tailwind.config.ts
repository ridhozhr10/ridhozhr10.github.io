import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true
    },
    extend:{
      fontFamily: {
        'sans': 'Inter, -apple-system, BlinkMacSystemFont, "Roboto", "Segoe UI", Helvetica, Arial, sans-serif',
        'mono': 'monospace, monospace'
      },
      colors: {
        'header-bg-dark': "#1b1c1d",
        'bg-dark': "#232425"
      },
      animation: {
        'cursor': 'cursor 1s infinite',
        'typing': 'typing 15s steps(20, end) infinite'
      },
      keyframes: {
        cursor: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        typing: {
          '5%': {width: '0%'},
          '15%, 90%': {width: '100%'},
          '100%': {width: '0%'},
        }
      }
    }
  },
  plugins: [],
};
export default config;
