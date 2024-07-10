import type { Config } from "tailwindcss";
import { colors } from "./src/constants/colors";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/shared-pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        error: "#FF0000",
        warning: colors.warningColor,
        success: colors.successColor,
        danger: colors.dangerColor,
        muted: colors.mutedColor,
        mutedText: colors.mutedTextColor,
        primary: "var(--primary-color)",
        secondary: "var(--secondary-color)",
      },
    },
  },
  plugins: [
    function ({ addVariant }: any) {
      addVariant("_dark", ":is(.dark &):not(.light &)");
    },
  ],
};
export default config;
