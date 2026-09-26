"use client";

import { useState, type CSSProperties } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Copy01Icon, Tick02Icon } from "@hugeicons/core-free-icons";
import { Input } from "@sunnie/ui/input";
import { Button } from "@sunnie/ui/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@sunnie/ui/input-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@sunnie/ui/select";
import { DocsNavigation } from "./docs-navigation";
import { ThemeToggle } from "./docs-shell";
import type { Easing } from "./easings";

const directions = [
  { value: "all", label: "All" },
  { value: "in", label: "In" },
  { value: "out", label: "Out" },
  { value: "in-out", label: "In-Out" },
];

const animations = [
  { value: "translate", label: "Translate" },
  { value: "scale", label: "Scale" },
  { value: "rotate", label: "Rotate" },
];

function EasingTile({
  easing,
  active,
  onActivate,
  onDeactivate,
}: {
  easing: Easing;
  active: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
}) {
  const [copyStatus, setCopyStatus] = useState("");
  const [x1, y1, x2, y2] = easing.points;
  const className = easing.variable.slice(2);

  async function copyEasing() {
    try {
      await navigator.clipboard.writeText(className);
      setCopyStatus(`Copied ${className}`);
    } catch {
      setCopyStatus("Copy failed. Try again.");
    }
  }

  return (
    <article
      className="easing-tile component-tile group/easing relative min-w-0 overflow-hidden bg-background"
      data-preview={active || undefined}
      style={{ "--easing-preview": `var(${easing.variable})` } as CSSProperties}
      onPointerEnter={(event) => {
        if (event.pointerType === "mouse") onActivate();
      }}
      onPointerLeave={() => {
        onDeactivate();
        setCopyStatus("");
      }}
    >
      <button
        type="button"
        onClick={copyEasing}
        onFocus={onActivate}
        onBlur={() => {
          onDeactivate();
          setCopyStatus("");
        }}
        aria-label={`Copy ${easing.name} easing class`}
        title={copyStatus || `Copy ${className}`}
        className="relative block w-full cursor-pointer pb-13 text-left outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring"
      >
        <span className="flex h-[280px] w-full flex-col items-center justify-center gap-6 p-6">
          <svg
            viewBox="0 0 200 200"
            className="size-40 shrink-0 overflow-visible"
            aria-hidden="true"
          >
            <rect x="10" y="10" width="180" height="180" fill="none" stroke="var(--border)" />
            <path d="M 10 190 L 190 10" fill="none" stroke="var(--border)" />
            <path
              d={`M 10 190 C ${10 + x1 * 180} ${190 - y1 * 180}, ${10 + x2 * 180} ${190 - y2 * 180}, 190 10`}
              fill="none"
              stroke="var(--muted-foreground)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Time moves linearly on x; the CSS easing controls progress on y. */}
            <g className="easing-marker-x">
              <g className="easing-marker-y">
                <circle
                  cx="10"
                  cy="190"
                  r="6"
                  fill="currentColor"
                  stroke="var(--background)"
                  strokeWidth="3"
                />
              </g>
            </g>
          </svg>
          <span className="flex h-10 w-full items-center justify-center" aria-hidden="true">
            <span className="easing-square size-8 rounded-lg bg-foreground" />
          </span>
        </span>
        <span className="absolute bottom-4 left-[22px] inline-flex items-center gap-1.5 text-sm font-medium">
          <span>{easing.name}</span>
          <HugeiconsIcon
            icon={copyStatus.startsWith("Copied") ? Tick02Icon : Copy01Icon}
            size={16}
            strokeWidth={1.5}
            className="easing-copy-icon pointer-events-none -translate-x-1 scale-25 text-muted-foreground opacity-0 blur-[4px] transition-[opacity,filter,translate,scale] duration-150 ease-out group-data-preview/easing:translate-x-0 group-data-preview/easing:scale-100 group-data-preview/easing:opacity-100 group-data-preview/easing:blur-none motion-reduce:translate-x-0 motion-reduce:scale-100 motion-reduce:blur-none motion-reduce:transition-none"
          />
        </span>
      </button>
      <output className="sr-only">{copyStatus}</output>
    </article>
  );
}

export function EasingGrid({ easings }: { easings: Easing[] }) {
  const [direction, setDirection] = useState("all");
  const [query, setQuery] = useState("");
  const [animation, setAnimation] = useState("rotate");
  const [durationInput, setDurationInput] = useState("1000");
  const [activeEasing, setActiveEasing] = useState<string | null>(null);
  const duration = Math.min(5000, Math.max(100, Number(durationInput || 1000)));
  const visibleEasings = easings.filter(
    (easing) =>
      (direction === "all" || easing.direction === direction) &&
      `${easing.name} ${easing.variable}`.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <main
      id="main-content"
      className="mx-auto max-w-[1600px] px-[clamp(20px,4vw,64px)] pt-11 pb-12 max-[700px]:pt-7"
    >
      <h1 className="sr-only">Easings</h1>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-5">
        <DocsNavigation active="easing" />
        <div className="flex max-w-full flex-wrap items-center gap-2">
          <Input
            type="search"
            aria-label="Find an easing"
            placeholder="Find an easing…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="h-8 w-64 max-[700px]:w-[min(256px,calc(100vw-84px))]"
          />
          <InputGroup className="h-8 w-28">
            <InputGroupInput
              type="number"
              aria-label="Duration in milliseconds"
              min={100}
              max={5000}
              step={100}
              value={durationInput}
              onChange={(event) => setDurationInput(event.target.value)}
              onBlur={() => setDurationInput(String(duration))}
              className="h-8 tabular-nums"
            />
            <InputGroupAddon align="inline-end" aria-hidden="true">
              ms
            </InputGroupAddon>
          </InputGroup>
          <div className="flex items-center gap-2">
            <Select
              items={directions}
              value={direction}
              onValueChange={(value) => {
                if (value) setDirection(value);
              }}
            >
              <SelectTrigger size="sm" className="w-28" aria-label="Filter easings">
                <SelectValue />
              </SelectTrigger>
              <SelectContent alignItemWithTrigger={false}>
                <SelectGroup>
                  {directions.map(({ value, label }) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select
              items={animations}
              value={animation}
              onValueChange={(value) => {
                if (value) setAnimation(value);
              }}
            >
              <SelectTrigger size="sm" className="w-28" aria-label="Animation type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent alignItemWithTrigger={false}>
                <SelectGroup>
                  {animations.map(({ value, label }) => (
                    <SelectItem key={value} value={value}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <ThemeToggle />
          </div>
        </div>
      </div>
      <div
        className="easing-grid component-grid grid gap-0"
        data-previewing={
          visibleEasings.some((easing) => easing.variable === activeEasing) || undefined
        }
        style={
          {
            "--easing-duration": `${duration}ms`,
            "--easing-animation": `easing-${animation}`,
          } as CSSProperties
        }
      >
        {visibleEasings.map((easing) => (
          <EasingTile
            key={easing.variable}
            easing={easing}
            active={activeEasing === easing.variable}
            onActivate={() => setActiveEasing(easing.variable)}
            onDeactivate={() =>
              setActiveEasing((active) => (active === easing.variable ? null : active))
            }
          />
        ))}
      </div>
      {!visibleEasings.length && (
        <div className="flex flex-col items-center gap-5 rounded-[12px] border border-dashed px-5 py-[100px] text-sm">
          <p>No easings match this search.</p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setQuery("");
              setDirection("all");
            }}
          >
            Clear search
          </Button>
        </div>
      )}
    </main>
  );
}
