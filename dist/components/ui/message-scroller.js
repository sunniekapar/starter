"use client";
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { MessageScroller as MessageScrollerPrimitive, useMessageScroller, useMessageScrollerScrollable, useMessageScrollerVisibility, } from "@shadcn/react/message-scroller";
import { cn } from "cn";
import { Button } from "./button.js";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown02Icon } from "@hugeicons/core-free-icons";
function MessageScrollerProvider(props) {
    return _jsx(MessageScrollerPrimitive.Provider, { ...props });
}
function MessageScroller({ className, ...props }) {
    return (_jsx(MessageScrollerPrimitive.Root, { "data-slot": "message-scroller", className: cn("group/message-scroller relative flex size-full min-h-0 flex-col overflow-hidden", className), ...props }));
}
function MessageScrollerViewport({ className, ...props }) {
    return (_jsx(MessageScrollerPrimitive.Viewport, { "data-slot": "message-scroller-viewport", className: cn("size-full min-h-0 min-w-0 scroll-fade-b scrollbar-thin scrollbar-gutter-stable overflow-y-auto overscroll-contain contain-content data-autoscrolling:scrollbar-thumb-transparent data-autoscrolling:scrollbar-track-transparent data-pending-scroll:invisible", className), ...props }));
}
function MessageScrollerContent({ className, ...props }) {
    return (_jsx(MessageScrollerPrimitive.Content, { "data-slot": "message-scroller-content", className: cn("flex h-max min-h-full flex-col gap-8", className), ...props }));
}
function MessageScrollerItem({ className, scrollAnchor = false, ...props }) {
    return (_jsx(MessageScrollerPrimitive.Item, { "data-slot": "message-scroller-item", scrollAnchor: scrollAnchor, className: cn("min-w-0 shrink-0 [contain-intrinsic-size:auto_10rem] [content-visibility:auto]", className), ...props }));
}
function MessageScrollerButton({ direction = "end", className, children, render, variant = "secondary", size = "icon-sm", ...props }) {
    return (_jsx(MessageScrollerPrimitive.Button, { "data-slot": "message-scroller-button", "data-direction": direction, "data-variant": variant, "data-size": size, direction: direction, className: cn("absolute inset-s-1/2 -translate-x-1/2 border-border bg-background text-foreground transition-[translate,scale,opacity] duration-150 ease-out motion-reduce:transition-none hover:bg-muted hover:text-foreground data-[active=false]:pointer-events-none data-[active=false]:scale-95 data-[active=false]:opacity-0 data-[active=false]:duration-150 data-[active=false]:ease-out data-[active=true]:translate-y-0 data-[active=true]:scale-100 data-[active=true]:opacity-100 data-[active=true]:ease-out data-[direction=end]:bottom-4 data-[direction=end]:data-[active=false]:translate-y-2 data-[direction=start]:top-4 data-[direction=start]:data-[active=false]:-translate-y-2 rtl:translate-x-1/2 data-[direction=start]:[&_svg]:rotate-180", className), render: render ?? _jsx(Button, { variant: variant, size: size }), ...props, children: children ?? (_jsxs(_Fragment, { children: [_jsx(HugeiconsIcon, { icon: ArrowDown02Icon, strokeWidth: 2 }), _jsx("span", { className: "sr-only", children: direction === "end" ? "Scroll to end" : "Scroll to start" })] })) }));
}
export { MessageScrollerProvider, MessageScroller, MessageScrollerViewport, MessageScrollerContent, MessageScrollerItem, MessageScrollerButton, useMessageScroller, useMessageScrollerScrollable, useMessageScrollerVisibility, };
//# sourceMappingURL=message-scroller.js.map