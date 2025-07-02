import {
  Logo,
  __toESM,
  require_jsx_runtime
} from "./common-G5DJCPU6.js";

// frontend/src/components/LeftBrandingPanel.tsx
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
function LeftBrandingPanel({ children }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      className: "hidden lg:flex lg:w-1/2 relative overflow-hidden",
      style: { background: `linear-gradient(to bottom right, var(--color-primary), oklch(50% 0.245 27.325))` },
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-black opacity-20" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "relative z-10 flex flex-col justify-center items-center text-white p-12", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "text-center max-w-md", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mb-6 flex justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { size: 60, showText: false, className: "text-white" }) }),
          children
        ] }) })
      ]
    }
  );
}

export {
  LeftBrandingPanel
};
