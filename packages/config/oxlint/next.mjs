import react from "./react.mjs";

/** @type {import("oxlint").OxlintConfig} */
const config = {
  ...react,
  plugins: [...react.plugins, "nextjs"],
};

export default config;
