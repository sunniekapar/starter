import base from "./base.mjs";

/** @satisfies {import("oxlint").OxlintConfig} */
const config = {
  ...base,
  plugins: [...base.plugins, "react", "jsx-a11y"],
  env: { browser: true, node: true },
};

export default config;
