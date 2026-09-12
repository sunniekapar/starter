import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Slider as SliderPrimitive } from "@base-ui/react/slider";
import { cn } from "cn";
function Slider({ className, defaultValue, value, min = 0, max = 100, ...props }) {
    const _values = Array.isArray(value)
        ? value
        : Array.isArray(defaultValue)
            ? defaultValue
            : [min, max];
    return (_jsx(SliderPrimitive.Root, { className: cn("data-horizontal:w-full data-vertical:h-full", className), "data-slot": "slider", defaultValue: defaultValue, value: value, min: min, max: max, thumbAlignment: "edge", ...props, children: _jsxs(SliderPrimitive.Control, { className: "relative flex w-full touch-none items-center select-none data-disabled:opacity-50 data-vertical:h-full data-vertical:min-h-40 data-vertical:w-auto data-vertical:flex-col", children: [_jsx(SliderPrimitive.Track, { "data-slot": "slider-track", className: "relative grow overflow-hidden rounded-full bg-input/90 select-none data-horizontal:h-2 data-horizontal:w-full data-vertical:h-full data-vertical:w-2", children: _jsx(SliderPrimitive.Indicator, { "data-slot": "slider-range", className: "bg-primary select-none data-horizontal:h-full data-vertical:w-full" }) }), Array.from({ length: _values.length }, (_, index) => (_jsx(SliderPrimitive.Thumb, { "data-slot": "slider-thumb", className: "block h-4 w-6 shrink-0 rounded-full bg-background shadow-md ring ring-foreground/10 transition-[color,box-shadow,background-color] select-none not-dark:bg-clip-padding hover:ring-4 hover:ring-ring/30 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring/30 disabled:pointer-events-none disabled:opacity-50 data-vertical:h-6 data-vertical:w-4" }, index)))] }) }));
}
export { Slider };
//# sourceMappingURL=slider.js.map