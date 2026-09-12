import { readdirSync } from "node:fs";
import type { NextConfig } from "next";

// The published ESM package uses .js specifiers. Point the docs at its live TS source.
const componentAliases = Object.fromEntries(
  readdirSync("components/ui")
    .filter((file) => file.endsWith(".tsx"))
    .flatMap((file) => {
      const name = file.replace(/\.tsx$/, ".js");
      return [
        [`./components/ui/${name}`, `./components/ui/${file}`],
        [`./${name}`, `./components/ui/${file}`],
      ];
    }),
);

const nextConfig: NextConfig = {
  allowedDevOrigins: ["ui.sunniekapar.localhost"],
  turbopack: {
    resolveAlias: {
      ...componentAliases,
      "./hooks/use-mobile.js": "./hooks/use-mobile.ts",
      "../../hooks/use-mobile.js": "./hooks/use-mobile.ts",
      "./lib/utils.js": "./lib/utils.ts",
    },
  },
};

export default nextConfig;
