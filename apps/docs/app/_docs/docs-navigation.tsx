"use client";

import Link from "next/link";
import { buttonVariants } from "@sunnie/ui/button";
import { cn } from "@sunnie/ui/utils";

export function DocsNavigation({ active }: { active: "components" | "easing" }) {
  return (
    <nav aria-label="Documentation" className="flex items-center gap-1">
      {[
        { href: "/components", label: "Components", section: "components" },
        { href: "/easing", label: "Easings", section: "easing" },
      ].map(({ href, label, section }) => (
        <Link
          key={section}
          href={href}
          aria-current={active === section ? "page" : undefined}
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "text-muted-foreground aria-[current=page]:text-foreground",
          )}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
