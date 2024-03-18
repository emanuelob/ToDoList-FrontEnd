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
        branco: '#fefefe',
        terracota: '#de6c5c',
        verdepastel: '#c6e5b1',
        marrompastel: '#a68069'
      }
    },
    fontFamily: {
      'montserrat': ['Montserrat', 'sans-serif'],
      'patrick-hand': ['Patrick Hand', 'cursive'],
    },
  },
  plugins: [],
};
export default config;
