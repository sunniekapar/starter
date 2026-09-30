import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "cn";
import { HugeiconsIcon } from "@hugeicons/react";
import { Loading03Icon } from "@hugeicons/core-free-icons";
function Spinner({ className, ...props }) {
    return (_jsx(HugeiconsIcon, { icon: Loading03Icon, strokeWidth: 2, "data-slot": "spinner", role: "status", "aria-label": "Loading", className: cn("size-4 animate-spin", className), ...props }));
}
export { Spinner };
//# sourceMappingURL=spinner.js.map