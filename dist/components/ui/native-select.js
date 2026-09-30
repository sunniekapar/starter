import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "cn";
import { HugeiconsIcon } from "@hugeicons/react";
import { UnfoldMoreIcon } from "@hugeicons/core-free-icons";
function NativeSelect({ className, size = "default", ...props }) {
    return (_jsxs("div", { className: cn("group/native-select relative w-fit has-[select:disabled]:opacity-50", className), "data-slot": "native-select-wrapper", "data-size": size, children: [_jsx("select", { "data-slot": "native-select", "data-size": size, className: "h-9 w-full min-w-0 appearance-none rounded-3xl border border-transparent bg-input/50 py-1 pr-8 pl-3 text-sm transition-[color,box-shadow,background-color] outline-none select-none selection:bg-primary selection:text-primary-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 disabled:pointer-events-none disabled:cursor-not-allowed aria-invalid:border-destructive aria-invalid:ring-2 aria-invalid:ring-destructive/20 data-[size=sm]:h-8 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40", ...props }), _jsx(HugeiconsIcon, { icon: UnfoldMoreIcon, strokeWidth: 2, className: "pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 text-muted-foreground select-none", "aria-hidden": "true", "data-slot": "native-select-icon" })] }));
}
function NativeSelectOption({ className, ...props }) {
    return (_jsx("option", { "data-slot": "native-select-option", className: cn("bg-[Canvas] text-[CanvasText]", className), ...props }));
}
function NativeSelectOptGroup({ className, ...props }) {
    return (_jsx("optgroup", { "data-slot": "native-select-optgroup", className: cn("bg-[Canvas] text-[CanvasText]", className), ...props }));
}
export { NativeSelect, NativeSelectOptGroup, NativeSelectOption };
//# sourceMappingURL=native-select.js.map