import config from "@sunnie/config/oxlint/next";
import { defineConfig } from "oxlint";

export default defineConfig({
  extends: [config],
  overrides: [
    {
      // Keep the preset's element types and ARIA roles in shared components.
      files: ["components/ui/**/*.tsx"],
      rules: { "jsx-a11y/prefer-tag-over-role": "off" },
    },
  ],
});
