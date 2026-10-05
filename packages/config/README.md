# @sunnie/config

Shared TypeScript, Oxlint, and Oxfmt settings.

Use `@sunnie/config/tsconfig/next.json` for Next.js apps or `@sunnie/config/tsconfig/node.json` for compiled libraries.

```json
{
  "extends": "@sunnie/config/tsconfig/next.json"
}
```

Oxlint exports are `@sunnie/config/oxlint`, `@sunnie/config/oxlint/react`, and `@sunnie/config/oxlint/next`.

```ts
import config from "@sunnie/config/oxlint/next";
export default config;
```

```ts
import config from "@sunnie/config/oxfmt";
export default config;
```

Install Oxlint and Oxfmt in the consuming project. This package contains tool settings and TypeScript declarations.
