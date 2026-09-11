# UI

Shared components in `@sunnie/ui`. The Next.js app provides a small preview. Add documentation to the app when needed.

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

The package names are local defaults. Neither package has been published.

## Checks

```sh
pnpm check
pnpm build
```

`check` runs Oxlint, Oxfmt, and TypeScript. `build` builds the UI package and the Next.js app. Use `pnpm fmt` to format files.

## Package contents

- `components/ui`: All 61 component modules available for this preset.
- `hooks`: Shared hooks, including `useIsMobile`.
- `styles.css`: Shared theme and Tailwind CSS source paths.
- `lib`: Shared utilities.
- `index.ts`: Main package exports.
- `app`: Preview app and future documentation.

`pnpm pack` creates an installable archive. It includes compiled components, type declarations, and styles. It excludes the Next.js app.

## Use in another app

Install the package archive until a registry release is available. The app must use React 19 and Tailwind CSS 4.

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

The local configuration dependency uses `file:../config`. After a configuration release, replace it with a version dependency. Existing projects receive changes when they update their package versions and rebuild.
