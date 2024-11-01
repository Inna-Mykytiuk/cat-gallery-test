import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",

      smOnly: { max: "767.98px" },
      mdOnly: { min: "768px", max: "1279.98px" },
      notXL: { max: "1279.98px" },
    },
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "1rem",
          md: "1.875rem",
          xl: "1.875rem",
        },
      },
      backgroundImage: {
        cardOverlay:
          "linear-gradient(180deg, rgba(0, 0, 0, 0.65) 15.4%, rgba(0, 0, 0, 0.39) 23.9%, rgba(0, 0, 0, 0.00) 34.4%)",
        checkmark: `url(/icons/checkmark.svg)`,
        backdrop: `linear-gradient(rgba(41, 41, 41, 0.40),rgba(41, 41, 41, 0.40))`,
        gradient: `linear-gradient(90deg, #9ea7fc 0%, #65b6f7 100%)`,
      },
      boxShadow: {
        shadow: "0px 10px 24px -15px rgba(0, 0, 0, 0.5)",
        input: "0px 5px 15px -12px rgba(0, 0, 0, 0.5)",
        "custom-card": "0px 0px 10px 0px #d2d7e0",
      },
      content: {
        arrowUp: `url(/icons/arrowUp.svg)`,
      },
      fontFamily: {
        roboto: ["var(--font-roboto)"],
      },
      fontSize: {
        light: ["22px", "1.5"],
        medium: ["28px", "1.5"],
      },
      colors: {
        mainColor: "#707090",
        unactive: "#b7bec7",
        mainBcg: "#888fdc",
      },
    },
  },
  plugins: [],
};
export default config;
