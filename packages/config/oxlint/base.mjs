/** @satisfies {import("oxlint").OxlintConfig} */
const config = {
  plugins: ["typescript", "unicorn", "oxc"],
  categories: { correctness: "error" },
  ignorePatterns: [
    "**/node_modules/**",
    "**/dist/**",
    "**/.next/**",
    "**/out/**",
    "**/coverage/**",
  ],
};

export default config;
