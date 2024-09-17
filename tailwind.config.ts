import type { Config } from "tailwindcss";
export const customColors = {
  "hwh-zenless-yellow-light": "#ffd129",
  "hwh-genshin-green-light": "#2BAC72",
  "hwh-starrail-blue-light": "#5880fd",
  "hwh-element-dark": "#2F2F2F",
  "hwh-background-dark": "#222222",
  "hwh-white-text-dark": "#D7D7D7",
  "hwh-placeholder-text-dark": "#676767",
  "hwh-legendary-dark": "#BC8C69",
  "hwh-element-legendary-dark": "#694D39",
  "hwh-epic-dark": "#A166BC",
  "hwh-element-epic-dark": "#50335E",
  "hwh-body-text-dark": "#898989"
}
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: customColors,
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
