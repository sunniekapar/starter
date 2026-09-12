# UI

Shared components in `@sunnie/ui`. The Next.js app shows a component grid, live examples, and props.

The initial setup uses this command:

```sh
pnpm dlx shadcn@latest init --preset b1VlJAwM --template next
```

The preset uses Base UI, Luma, neutral colours, Hugeicons, and Inter.

## Local setup

Use Node.js 22.18 or later and pnpm 11.25.0. Keep the configuration repository at `../config`.

```sh
pnpm --dir ../config install
pnpm --dir ../config build
pnpm install
pnpm dev
```

The UI package is private and is distributed through GitHub releases. Registry publication is disabled.

## Checks

```sh
pnpm check
pnpm build
```

`check` runs Oxlint, Oxfmt, and TypeScript. `build` builds the UI package and the Next.js app. Use `pnpm fmt` to format files.

## Component docs

Run `pnpm dev` and open the URL shown in the terminal. The home page shows all components. Select a card to see its examples and props. Use `⌘K` (or `Ctrl+K`) to find a component from any page. Use the theme button beside search or press `D` to change the color theme. Props appear below the examples.

- `app/_docs/catalog.ts`: Component names and example states.
- `app/_docs/examples.tsx`: Live examples built from the package components.
- `scripts/generate-docs.mjs`: Reads public props from TypeScript, including inherited types and wrapper defaults.

Props are generated when you start the app, build it, or run the type check. After a prop change during development, run `pnpm docs:generate` to refresh the table. Generated files stay out of Git and the published UI package.

To add a component, add its entry and state names to the catalog, then add its examples. Keep the props in the component types; no separate props list is needed.

The layout references [Kumo](https://github.com/cloudflare/kumo), [shadcn/ui](https://github.com/shadcn-ui/ui), and [coss](https://github.com/cosscom/coss). The docs code is written for this package.

## Package contents

- `components/ui`: All 61 component modules available for this preset.
- `hooks`: Shared hooks, including `useIsMobile`.
- `styles.css`: Shared theme and Tailwind CSS source paths.
- `lib`: Shared utilities.
- `index.ts`: Main package exports.
- `app`: Component gallery and documentation.

`pnpm pack` creates an installable archive. It includes compiled components, type declarations, and styles. It excludes the Next.js app.

## Use in another app

Install the compiled Git release. The app must use React 19 and Tailwind CSS 4.

```sh
pnpm add '@sunnie/ui@git+https://github.com/sunniekapar/starter.git#v0.2.1'
```

GitHub access is required. Update the tag and lockfile to use a newer release. The `v0.1.0` and `v0.2.0` releases contain source tags and built package archives; direct Git installation starts with `v0.2.1`.

```tsx
import { Button, Input, Dialog, DialogContent } from "@sunnie/ui";
```

Each component module also has a direct import path:

```tsx
import { Button } from "@sunnie/ui/button";
import { Calendar } from "@sunnie/ui/calendar";
import { useIsMobile } from "@sunnie/ui/hooks/use-mobile";
```

Use interactive components and hooks inside a client component. Wrap tooltips with `TooltipProvider`. Use the other providers, such as `SidebarProvider` and `ToastProvider`, where those components require them.

Add these imports to the app's global CSS:

```css
@import "tailwindcss";
@import "@sunnie/ui/styles.css";
```

The shared stylesheet registers the compiled component files with Tailwind. Set the `--font-sans` variable to use the app's chosen font. This preview loads Inter through `next/font`.

## Update components

All available components were installed with:

```sh
pnpm exec shadcn add --all --yes
```

Keep reusable components in `components/ui`. Use relative imports with `.js` extensions within the package. The package export pattern gives each component its own import path. Add new modules to `index.ts` to expose their named exports from `@sunnie/ui` too.

Check generated updates before overwriting files. Some files have small changes for strict TypeScript checks, package imports, and client component boundaries. The mobile hook uses `useSyncExternalStore`. Local lint exceptions preserve the preset's ARIA roles, input focus behaviour, and carousel state setup. Run the checks and build before a release.

The local configuration dependency uses `file:../config` for UI development. Compiled Git releases exclude development dependencies, so consuming apps do not need that folder.

For a new release, update `version` in `package.json`, run the checks, and commit the source changes. Then run `pnpm release`. The command builds the UI, pushes a separate compiled package tag, and creates a GitHub release with `gh`. Use `pnpm release --prepare-only` to build the package archive without publishing it.
