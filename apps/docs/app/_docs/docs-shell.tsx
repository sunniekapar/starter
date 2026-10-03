"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Button } from "@sunnie/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@sunnie/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@sunnie/ui/command";
import { Kbd } from "@sunnie/ui/kbd";
import { HugeiconsIcon } from "@hugeicons/react";
import { Moon02Icon, Sun03Icon, Search01Icon } from "@hugeicons/core-free-icons";
import { catalog } from "./catalog";

const ComponentSearchContext = createContext<{ open: boolean; show: () => void } | null>(null);

export function DocsShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const returnFocus = useRef<HTMLElement | null>(null);
  const show = useCallback(() => {
    returnFocus.current =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setOpen(true);
  }, []);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && !event.altKey && event.key.toLowerCase() === "k") {
        event.preventDefault();
        if (!event.repeat) {
          if (open) setOpen(false);
          else show();
        }
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, show]);

  return (
    <ComponentSearchContext.Provider value={{ open, show }}>
      {children}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent
          className="overflow-hidden rounded-[calc(min(var(--radius-4xl),var(--spacing)*4.5)+var(--spacing)*2+var(--default-border-width))] p-0"
          showCloseButton={false}
          finalFocus={returnFocus}
        >
          <DialogTitle className="sr-only">Find a component</DialogTitle>
          <DialogDescription className="sr-only">
            Search components. Use the arrow keys to select a result, then press Enter.
          </DialogDescription>
          <Command loop>
            <CommandInput placeholder="Find a component…" aria-label="Search components" />
            <CommandList>
              <CommandEmpty>No components found.</CommandEmpty>
              <CommandGroup>
                {catalog.map((component) => (
                  <CommandItem
                    key={component.slug}
                    value={component.name}
                    keywords={[component.slug]}
                    onSelect={() => {
                      setOpen(false);
                      router.push(`/components/${component.slug}`);
                    }}
                  >
                    {component.name}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </ComponentSearchContext.Provider>
  );
}

export function ComponentSearchTrigger({ compact = false }: { compact?: boolean }) {
  const search = useContext(ComponentSearchContext);
  return (
    <Button
      variant="ghost"
      className={
        compact
          ? "h-7 p-1"
          : "w-64 justify-start bg-input/50 font-normal text-muted-foreground max-[700px]:w-[min(256px,calc(100vw-84px))]"
      }
      onClick={() => search?.show()}
      aria-haspopup="dialog"
      aria-expanded={search?.open ?? false}
      aria-label="Find a component"
      aria-keyshortcuts="Meta+K Control+K"
    >
      {!compact && (
        <>
          <HugeiconsIcon icon={Search01Icon} size={16} strokeWidth={1.5} />
          <span>Find a component…</span>
        </>
      )}
      <Kbd className="ml-auto">⌘ K</Kbd>
    </Button>
  );
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  return (
    <Button
      variant="ghost"
      size="icon-sm"
      aria-label="Toggle color theme"
      title="Toggle color theme (D)"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <HugeiconsIcon icon={Sun03Icon} className="hidden dark:inline" size={18} strokeWidth={1.5} />
      <HugeiconsIcon icon={Moon02Icon} className="dark:hidden" size={18} strokeWidth={1.5} />
    </Button>
  );
}

export function DocsControls() {
  return (
    <div className="flex max-w-full items-center gap-2">
      <ComponentSearchTrigger />
      <ThemeToggle />
    </div>
  );
}
