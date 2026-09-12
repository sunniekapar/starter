"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { Menubar as MenubarPrimitive } from "@base-ui/react/menubar";
import { cn } from "cn";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuRadioGroup, DropdownMenuSeparator, DropdownMenuShortcut, DropdownMenuSub, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger, } from "./dropdown-menu.js";
import { HugeiconsIcon } from "@hugeicons/react";
import { Tick02Icon } from "@hugeicons/core-free-icons";
function Menubar({ className, ...props }) {
    return (_jsx(MenubarPrimitive, { "data-slot": "menubar", className: cn("flex h-9 items-center rounded-3xl border p-1", className), ...props }));
}
function MenubarMenu({ ...props }) {
    return _jsx(DropdownMenu, { "data-slot": "menubar-menu", ...props });
}
function MenubarGroup({ ...props }) {
    return _jsx(DropdownMenuGroup, { "data-slot": "menubar-group", ...props });
}
function MenubarPortal({ ...props }) {
    return _jsx(DropdownMenuPortal, { "data-slot": "menubar-portal", ...props });
}
function MenubarTrigger({ className, ...props }) {
    return (_jsx(DropdownMenuTrigger, { "data-slot": "menubar-trigger", className: cn("flex items-center rounded-2xl px-2 py-0.75 text-sm font-medium outline-hidden select-none hover:bg-muted aria-expanded:bg-muted", className), ...props }));
}
function MenubarContent({ className, align = "start", alignOffset = -4, sideOffset = 8, ...props }) {
    return (_jsx(DropdownMenuContent, { "data-slot": "menubar-content", align: align, alignOffset: alignOffset, sideOffset: sideOffset, className: cn("min-w-48 rounded-3xl p-1.5 text-popover-foreground shadow-lg ring ring-foreground/5 duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:ring-foreground/10 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 animate-none! relative bg-popover/70 before:pointer-events-none before:absolute before:inset-0 before:-z-1 before:rounded-[inherit] before:backdrop-blur-2xl before:backdrop-saturate-150 **:data-[slot$=-item]:focus:bg-foreground/10 **:data-[slot$=-item]:data-highlighted:bg-foreground/10 **:data-[slot$=-separator]:bg-foreground/5 **:data-[slot$=-trigger]:focus:bg-foreground/10 **:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! **:data-[variant=destructive]:focus:bg-foreground/10! **:data-[variant=destructive]:text-accent-foreground! **:data-[variant=destructive]:**:text-accent-foreground!", className), ...props }));
}
function MenubarItem({ className, inset, variant = "default", ...props }) {
    return (_jsx(DropdownMenuItem, { "data-slot": "menubar-item", "data-inset": inset, "data-variant": variant, className: cn("group/menubar-item gap-2.5 rounded-2xl px-3 py-2 text-sm font-medium focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-9.5 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 data-disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 data-[variant=destructive]:*:[svg]:text-destructive!", className), ...props }));
}
function MenubarCheckboxItem({ className, children, checked, inset, ...props }) {
    return (_jsxs(MenuPrimitive.CheckboxItem, { "data-slot": "menubar-checkbox-item", "data-inset": inset, className: cn("relative flex cursor-default items-center gap-2.5 rounded-2xl py-2 pr-3 pl-9.5 text-sm font-medium outline-hidden select-none focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-inset:pl-9.5 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0", className), checked: checked, ...props, children: [_jsx("span", { className: "pointer-events-none absolute left-3 flex size-4 items-center justify-center [&_svg:not([class*='size-'])]:size-4", children: _jsx(MenuPrimitive.CheckboxItemIndicator, { children: _jsx(HugeiconsIcon, { icon: Tick02Icon, strokeWidth: 2 }) }) }), children] }));
}
function MenubarRadioGroup({ ...props }) {
    return _jsx(DropdownMenuRadioGroup, { "data-slot": "menubar-radio-group", ...props });
}
function MenubarRadioItem({ className, children, inset, ...props }) {
    return (_jsxs(MenuPrimitive.RadioItem, { "data-slot": "menubar-radio-item", "data-inset": inset, className: cn("relative flex cursor-default items-center gap-2.5 rounded-2xl py-2 pr-3 pl-9.5 text-sm font-medium outline-hidden select-none focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-inset:pl-9.5 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className), ...props, children: [_jsx("span", { className: "pointer-events-none absolute left-3 flex size-4 items-center justify-center [&_svg:not([class*='size-'])]:size-4", children: _jsx(MenuPrimitive.RadioItemIndicator, { children: _jsx(HugeiconsIcon, { icon: Tick02Icon, strokeWidth: 2 }) }) }), children] }));
}
function MenubarLabel({ className, inset, ...props }) {
    return (_jsx(DropdownMenuLabel, { "data-slot": "menubar-label", "data-inset": inset, className: cn("px-3.5 py-2.5 text-xs text-muted-foreground data-inset:pl-9.5", className), ...props }));
}
function MenubarSeparator({ className, ...props }) {
    return (_jsx(DropdownMenuSeparator, { "data-slot": "menubar-separator", className: cn("-mx-1 my-1 h-(--default-border-width) bg-border/50", className), ...props }));
}
function MenubarShortcut({ className, ...props }) {
    return (_jsx(DropdownMenuShortcut, { "data-slot": "menubar-shortcut", className: cn("ml-auto text-xs tracking-widest text-muted-foreground group-focus/menubar-item:text-accent-foreground", className), ...props }));
}
function MenubarSub({ ...props }) {
    return _jsx(DropdownMenuSub, { "data-slot": "menubar-sub", ...props });
}
function MenubarSubTrigger({ className, inset, ...props }) {
    return (_jsx(DropdownMenuSubTrigger, { "data-slot": "menubar-sub-trigger", "data-inset": inset, className: cn("gap-2 rounded-2xl px-3 py-2 text-sm font-medium focus:bg-accent focus:text-accent-foreground data-inset:pl-9.5 data-open:bg-accent data-open:text-accent-foreground [&_svg:not([class*='size-'])]:size-4", className), ...props }));
}
function MenubarSubContent({ className, ...props }) {
    return (_jsx(DropdownMenuSubContent, { "data-slot": "menubar-sub-content", className: cn("min-w-32 rounded-3xl p-1.5 text-popover-foreground shadow-lg ring ring-foreground/5 duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 dark:ring-foreground/10 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95 animate-none! relative bg-popover/70 before:pointer-events-none before:absolute before:inset-0 before:-z-1 before:rounded-[inherit] before:backdrop-blur-2xl before:backdrop-saturate-150 **:data-[slot$=-item]:focus:bg-foreground/10 **:data-[slot$=-item]:data-highlighted:bg-foreground/10 **:data-[slot$=-separator]:bg-foreground/5 **:data-[slot$=-trigger]:focus:bg-foreground/10 **:data-[slot$=-trigger]:aria-expanded:bg-foreground/10! **:data-[variant=destructive]:focus:bg-foreground/10! **:data-[variant=destructive]:text-accent-foreground! **:data-[variant=destructive]:**:text-accent-foreground!", className), ...props }));
}
export { Menubar, MenubarPortal, MenubarMenu, MenubarTrigger, MenubarContent, MenubarGroup, MenubarSeparator, MenubarLabel, MenubarItem, MenubarShortcut, MenubarCheckboxItem, MenubarRadioGroup, MenubarRadioItem, MenubarSub, MenubarSubTrigger, MenubarSubContent, };
//# sourceMappingURL=menubar.js.map