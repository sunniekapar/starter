# Starter

A pnpm workspace for shared config, UI components, and component docs.

```text
apps/docs/        @sunnie/docs    Next.js docs app (private)
packages/ui/      @sunnie/ui      React components, hooks, utilities, and styles
packages/config/  @sunnie/config  Oxlint, Oxfmt, and TypeScript settings
```

The docs depend on UI. UI uses config during development. Config has no dependency on UI or docs. Each package declares its own dependencies. The root contains workspace commands. Shared tool and React versions are set in the pnpm catalog.

## Local setup

Use Node.js 22.18 or later and pnpm 11.25.0.

```sh
pnpm install
pnpm dev
```

`dev` builds the packages, then starts the UI compiler in watch mode and the docs server. UI edits update the compiled package used by the docs. Open the URL shown in the terminal.

## Commands

```sh
pnpm check          # Lint, format check, and type checks for all packages
pnpm build          # Build config, UI, and docs in dependency order
pnpm build:packages # Build config and UI
pnpm build:docs     # Build docs and its workspace dependencies
pnpm fmt            # Format the workspace
pnpm pack:ui        # Create the UI archive in artifacts/
pnpm pack:config    # Create the config archive in artifacts/
```

Use `pnpm --filter @sunnie/ui <command>` or `pnpm --filter @sunnie/docs <command>` to run a package command. Build dependencies first with `pnpm build:packages` when you run the docs app directly.

For docs hosting, set the project root to `apps/docs`. Run `pnpm --filter @sunnie/docs... build` as the build command. The host must include workspace files outside the app directory.

## Use UI in another app

The UI package contains compiled JavaScript, type declarations, and the `styles.css` and `typeset.css` files. It excludes docs, Next.js, and config tools. It requires React 19 and Tailwind CSS 4.

For a local archive:

```sh
pnpm pack:ui
# Run in the consuming app. Use the actual archive path.
pnpm add /path/to/starter/artifacts/sunnie-ui-0.2.6.tgz
```

For an existing compiled Git release:

```sh
pnpm add '@sunnie/ui@git+https://github.com/sunniekapar/starter.git#v0.2.06'
```

GitHub access is required. Install a compiled release tag. The source branch is a private workspace root. The workspace version uses valid semver, `0.2.6`; existing Git tags keep their original names.

```tsx
import { Button } from "@sunnie/ui/button";
import { useIsMobile } from "@sunnie/ui/hooks/use-mobile";
import { cn } from "@sunnie/ui/utils";
```

The root export, such as `import { Button } from "@sunnie/ui"`, is also available. Use interactive components and hooks inside a client component. Add required providers for tooltips, sidebars, and toasts.

Add these imports to the app's global CSS:

```css
@import "tailwindcss";
@import "@sunnie/ui/styles.css";
/* Optional text styles for articles and other prose. */
@import "@sunnie/ui/typeset.css";
```

The stylesheet registers the compiled components with Tailwind. Set `--font-sans` and `--font-mono` in the consuming app. The optional `typeset.css` file styles content within `.typeset`. Use `.not-typeset` to exclude a block. Titles and section headings use size 18px and weight 550; subheadings use weight 500. Override the `--typeset-*` variables to change spacing.

## Component docs

- `apps/docs/app/_docs/catalog.ts`: Component names and example states.
- `apps/docs/app/_docs/examples.tsx`: Examples that use the public UI exports.
- `apps/docs/scripts/generate-docs.mjs`: Reads UI source types to generate prop tables.

Prop tables are generated before development, builds, and type checks. Run `pnpm docs:generate` after a prop change during development. Generated files stay inside the docs app and are excluded from Git and package archives.

Select a component to see examples and props. Use `⌘K` or `Ctrl+K` to search. Press `D` to change the color theme.

## Update components

The components use the shadcn Base UI Luma preset, neutral colors, and Hugeicons. The app and UI package each have a `components.json` file. Run the CLI from the docs app:

```sh
pnpm --dir apps/docs dlx shadcn@latest add button
```

Check changes before overwriting existing components. Keep shared code in `packages/ui/src`. Use relative imports with `.js` extensions within the compiled library. Add new component exports to `packages/ui/src/index.ts`, then update the docs catalog and examples.

Local type exports point to UI source so editors and shadcn can find the source files. `publishConfig.exports` changes those paths to compiled declarations when pnpm packs the library. JavaScript imports use the compiled package in both cases.

## Releases

UI and config use separate versions and private Git releases. Registry publication is disabled. Update the version in the package's `package.json`, run the checks, and commit the source changes before a release.

```sh
pnpm release ui --prepare-only
pnpm release config --prepare-only
```

These commands prepare package archives without publishing. To publish, omit `--prepare-only`. UI tags use `v<version>`. Config tags use `config/v<version>`. Each tag contains only that compiled package and its runtime metadata. `pnpm release` defaults to UI.

## Workspace references

- [pnpm workspaces](https://pnpm.io/workspaces): Explicit local dependencies with `workspace:*`.
- [pnpm catalogs](https://pnpm.io/catalogs): Shared dependency versions.
- [shadcn monorepos](https://ui.shadcn.com/docs/monorepo): Separate app and UI packages with CLI routing.
- [Vercel UI package example](https://vercel.com/academy/production-monorepos/create-ui-package): Package exports and React peer dependencies.
