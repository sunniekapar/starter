"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { cn } from "cn";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./dialog.js";
import { InputGroup, InputGroupAddon } from "./input-group.js";
import { HugeiconsIcon } from "@hugeicons/react";
import { SearchIcon, Tick02Icon } from "@hugeicons/core-free-icons";
function Command({ className, ...props }) {
    return (_jsx(CommandPrimitive, { "data-slot": "command", className: cn("flex size-full flex-col overflow-hidden rounded-[calc(min(var(--radius-4xl),var(--spacing)*4.5)+var(--spacing)*2+var(--default-border-width))] bg-popover p-1 text-popover-foreground", className), ...props }));
}
function CommandDialog({ title = "Command Palette", description = "Search for a command to run...", children, className, showCloseButton = false, ...props }) {
    return (_jsxs(Dialog, { ...props, children: [_jsxs(DialogHeader, { className: "sr-only", children: [_jsx(DialogTitle, { children: title }), _jsx(DialogDescription, { children: description })] }), _jsx(DialogContent, { className: cn("top-1/3 translate-y-0 overflow-hidden rounded-[calc(min(var(--radius-4xl),var(--spacing)*4.5)+var(--spacing)*2+var(--default-border-width))]! p-0", className), showCloseButton: showCloseButton, children: children })] }));
}
function CommandInput({ className, ...props }) {
    return (_jsx("div", { "data-slot": "command-input-wrapper", className: "p-1 pb-0", children: _jsxs(InputGroup, { className: "h-9 bg-input/50 has-[[data-slot=command-input]:focus-visible]:border-ring has-[[data-slot=command-input]:focus-visible]:ring-2 has-[[data-slot=command-input]:focus-visible]:ring-ring/30", children: [_jsx(CommandPrimitive.Input, { "data-slot": "command-input", className: cn("w-full text-sm outline-none disabled:cursor-not-allowed disabled:opacity-50", className), ...props }), _jsx(InputGroupAddon, { children: _jsx(HugeiconsIcon, { icon: SearchIcon, strokeWidth: 2, className: "size-4 shrink-0 opacity-50" }) })] }) }));
}
function CommandList({ className, ...props }) {
    return (_jsx(CommandPrimitive.List, { "data-slot": "command-list", className: cn("no-scrollbar max-h-72 scroll-py-1 overflow-x-hidden overflow-y-auto outline-none", className), ...props }));
}
function CommandEmpty({ className, ...props }) {
    return (_jsx(CommandPrimitive.Empty, { "data-slot": "command-empty", className: cn("py-6 text-center text-sm", className), ...props }));
}
function CommandGroup({ className, ...props }) {
    return (_jsx(CommandPrimitive.Group, { "data-slot": "command-group", className: cn("overflow-hidden p-1.5 text-foreground **:[[cmdk-group-heading]]:px-3 **:[[cmdk-group-heading]]:py-2 **:[[cmdk-group-heading]]:text-xs **:[[cmdk-group-heading]]:font-medium **:[[cmdk-group-heading]]:text-muted-foreground", className), ...props }));
}
function CommandSeparator({ className, ...props }) {
    return (_jsx(CommandPrimitive.Separator, { "data-slot": "command-separator", className: cn("my-1.5 h-px bg-border/50", className), ...props }));
}
function CommandItem({ className, children, ...props }) {
    return (_jsxs(CommandPrimitive.Item, { "data-slot": "command-item", className: cn("group/command-item relative flex cursor-default items-center gap-2 rounded-2xl px-3 py-2 text-sm font-medium outline-hidden select-none in-data-[slot=dialog-content]:rounded-3xl data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 data-selected:bg-muted data-selected:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-selected:*:[svg]:text-foreground", className), ...props, children: [children, _jsx(HugeiconsIcon, { icon: Tick02Icon, strokeWidth: 2, className: "ml-auto opacity-0 group-has-data-[slot=command-shortcut]/command-item:hidden group-data-[checked=true]/command-item:opacity-100" })] }));
}
function CommandShortcut({ className, ...props }) {
    return (_jsx("span", { "data-slot": "command-shortcut", className: cn("ml-auto text-xs tracking-widest text-muted-foreground group-data-selected/command-item:text-foreground", className), ...props }));
}
export { Command, CommandDialog, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem, CommandShortcut, CommandSeparator, };
//# sourceMappingURL=command.js.map