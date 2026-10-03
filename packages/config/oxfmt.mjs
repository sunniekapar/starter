/** @type {import("oxfmt").OxfmtConfig} */
const config = {
  printWidth: 100,
  tabWidth: 2,
  useTabs: false,
  semi: true,
  singleQuote: false,
  trailingComma: "all",
  ignorePatterns: [
    "**/node_modules/**",
    "**/dist/**",
    "**/.next/**",
    "**/out/**",
    "**/coverage/**",
    "pnpm-lock.yaml",
  ],
};

export default config;
