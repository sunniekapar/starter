"use client";

import Link from "next/link";
import { useState } from "react";
import { Input } from "@sunnie/ui/input";
import { Button } from "@sunnie/ui/button";
import { catalog } from "./catalog";
import { Example, GridArrow } from "./examples";
import { ComponentSearchTrigger, ThemeToggle } from "./docs-shell";

export function ComponentGrid() {
  const [query, setQuery] = useState("");
  const components = catalog.filter((component) =>
    `${component.name} ${component.slug}`.toLowerCase().includes(query.trim().toLowerCase()),
  );
  return (
    <main
      id="main-content"
      className="mx-auto max-w-[1600px] px-[clamp(20px,4vw,64px)] pt-11 pb-12 max-[700px]:pt-7"
    >
      <div className="mb-8 flex flex-wrap items-center justify-between gap-5">
        <div className="flex items-baseline gap-3">
          <h1 className="text-[clamp(24px,3vw,30px)] leading-[1.2] font-medium tracking-[-0.045em]">
            Components
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-64 max-[700px]:w-[min(256px,calc(100vw-84px))]">
            <Input
              className="pr-14"
              type="search"
              aria-label="Find a component"
              placeholder="Find a component…"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <span className="absolute inset-y-0 right-[5px] flex items-center">
              <ComponentSearchTrigger compact />
            </span>
          </div>
          <ThemeToggle />
        </div>
      </div>
      {components.length ? (
        <div className="component-grid grid gap-0">
          {components.map((component) => (
            <article
              key={component.slug}
              className="component-tile relative min-w-0 overflow-hidden bg-background pb-13"
            >
              <div className="flex h-[248px] items-center justify-center p-8 has-[>[data-slot=command]]:py-5 [&_[data-slot=bubble-content]]:py-[5px] [&_[data-slot=bubble-group]]:gap-1 [&_[data-slot=calendar]]:origin-center [&_[data-slot=calendar]]:scale-[0.65] [&_[data-slot=calendar]]:shrink-0 [&_[data-slot=card]]:scale-[0.85] [&_[data-slot=empty]]:p-2 [&_[data-slot=message-scroller]]:h-[190px]">
                <Example slug={component.slug} state={component.states[0]} compact />
              </div>
              <Link
                href={`/components/${component.slug}`}
                prefetch={false}
                className="group/tile-link absolute bottom-4 left-[22px] z-10 inline-flex items-center gap-1.5 rounded-[4px] text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-[5px] focus-visible:outline-ring"
              >
                <span>{component.name}</span>
                <GridArrow className="pointer-events-none -translate-x-1 scale-25 text-muted-foreground opacity-0 blur-[4px] transition-[opacity,filter,translate,scale] duration-150 ease-[cubic-bezier(0.2,0,0,1)] group-hover/tile-link:translate-x-0 group-hover/tile-link:scale-100 group-hover/tile-link:opacity-100 group-hover/tile-link:blur-none group-focus-visible/tile-link:translate-x-0 group-focus-visible/tile-link:scale-100 group-focus-visible/tile-link:opacity-100 group-focus-visible/tile-link:blur-none motion-reduce:translate-x-0 motion-reduce:scale-100 motion-reduce:blur-none motion-reduce:transition-none" />
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center gap-5 rounded-[12px] border border-dashed px-5 py-[100px] text-sm">
          <p>No components match “{query}”.</p>
          <Button variant="outline" onClick={() => setQuery("")}>
            Clear search
          </Button>
        </div>
      )}
    </main>
  );
}
