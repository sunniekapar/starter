import Link from "next/link";
import type { ReactNode } from "react";
import { catalog, type ComponentDoc } from "./catalog";
import { Example } from "./examples";
import { DocsControls } from "./docs-shell";

function ExampleCard({ component, state }: { component: ComponentDoc; state: string }) {
  return (
    <section className="min-w-0">
      <h2 className="px-0.5 pb-2.5 text-[13px] font-medium">{state}</h2>
      <div className="flex min-h-[300px] items-center justify-center rounded-[12px] border p-8 max-[700px]:px-[18px] max-[700px]:py-6 [&>*]:min-w-0">
        <Example slug={component.slug} state={state} />
      </div>
    </section>
  );
}

export function ComponentPage({
  component,
  propsTable,
}: {
  component: ComponentDoc;
  propsTable: ReactNode;
}) {
  const index = catalog.findIndex((item) => item.slug === component.slug);
  const previous = catalog[index - 1];
  const next = catalog[index + 1];
  return (
    <main
      id="main-content"
      className="mx-auto max-w-[1280px] px-[clamp(20px,4vw,64px)] pt-11 pb-12 max-[700px]:pt-7"
    >
      <div className="mb-8 flex items-center justify-between gap-5 max-[700px]:flex-wrap max-[700px]:items-start">
        <Link href="/" className="inline-block text-sm text-muted-foreground hover:text-foreground">
          All components
        </Link>
        <DocsControls />
      </div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-5 max-[700px]:flex-col max-[700px]:items-start max-[700px]:gap-3">
        <h1 className="text-[clamp(24px,3vw,30px)] leading-[1.2] font-medium tracking-[-0.045em]">
          {component.name}
        </h1>
        <span className="font-mono text-xs text-muted-foreground">@sunnie/ui/{component.slug}</span>
      </div>
      <div className="grid grid-cols-1 gap-x-5 gap-y-7 min-[701px]:grid-cols-2">
        {component.states.map((state) => (
          <ExampleCard key={state} component={component} state={state} />
        ))}
      </div>
      <section className="mt-14" aria-labelledby="props-heading">
        <h2 id="props-heading" className="mb-5 text-xl font-medium tracking-[-0.02em]">
          Props
        </h2>
        {propsTable}
      </section>
      <nav className="mt-12 flex justify-between gap-5 text-sm" aria-label="Other components">
        <div>
          {previous && (
            <Link
              href={`/components/${previous.slug}`}
              aria-label={`Previous component: ${previous.name}`}
              className="underline-offset-4 hover:underline"
            >
              {previous.name}
            </Link>
          )}
        </div>
        <div>
          {next && (
            <Link
              href={`/components/${next.slug}`}
              aria-label={`Next component: ${next.name}`}
              className="underline-offset-4 hover:underline"
            >
              {next.name}
            </Link>
          )}
        </div>
      </nav>
    </main>
  );
}
