import {
  __toESM,
  cx,
  require_jsx_runtime,
  require_react
} from "./common-ZKMN625A.js";

// src/components/Checkbox.tsx
var import_react = __toESM(require_react(), 1);
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var Checkbox = (0, import_react.forwardRef)(
  ({ label, description, error, size = "md", variant = "default", className = "", id, children, ...props }, ref) => {
    const checkboxId = (0, import_react.useMemo)(() => id || `checkbox-${Math.random().toString(36).substring(2, 9)}`, [id]);
    const sizeClasses = {
      sm: "h-3 w-3",
      md: "h-4 w-4",
      lg: "h-5 w-5"
    };
    const baseCheckboxClasses = cx(
      "border-gray-300 dark:border-gray-600 rounded accent-primary",
      "dark:bg-gray-800 transition-colors duration-200",
      "focus:ring-2 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed",
      sizeClasses[size],
      error ? "border-red-500 dark:border-red-400" : "",
      className
    );
    const containerClasses = variant === "card" ? "p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-600 transition-colors duration-200" : "flex items-start space-x-3";
    const content = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "input",
        {
          ref,
          type: "checkbox",
          id: checkboxId,
          className: baseCheckboxClasses,
          "aria-invalid": error ? "true" : "false",
          "aria-describedby": error ? `${checkboxId}-error` : description ? `${checkboxId}-description` : void 0,
          ...props
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex-1", children: [
        label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "label",
          {
            htmlFor: checkboxId,
            className: cx(
              "block font-medium text-gray-700 dark:text-gray-300 cursor-pointer",
              size === "sm" ? "text-sm" : size === "lg" ? "text-base" : "text-sm",
              variant === "card" ? "mb-1" : ""
            ),
            children: label
          }
        ),
        children && !label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "label",
          {
            htmlFor: checkboxId,
            className: cx(
              "block font-medium text-gray-700 dark:text-gray-300 cursor-pointer",
              size === "sm" ? "text-sm" : size === "lg" ? "text-base" : "text-sm",
              variant === "card" ? "mb-1" : ""
            ),
            children
          }
        ),
        description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "p",
          {
            id: `${checkboxId}-description`,
            className: cx("text-gray-500 dark:text-gray-400 mt-1", size === "sm" ? "text-xs" : "text-sm"),
            children: description
          }
        ),
        error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "p",
          {
            id: `${checkboxId}-error`,
            className: cx("text-red-600 dark:text-red-400 mt-1", size === "sm" ? "text-xs" : "text-sm"),
            children: error
          }
        )
      ] })
    ] });
    if (variant === "card") {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: containerClasses, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex items-start space-x-3", children: content }) });
    }
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: containerClasses, children: content });
  }
);
Checkbox.displayName = "Checkbox";

export {
  Checkbox
};
//# sourceMappingURL=common-ZYHBS7DU.js.map
