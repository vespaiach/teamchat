import {
  Exclamation
} from "./common-QN5DUQOL.js";
import {
  LeftBrandingPanel
} from "./common-GTO3E3AZ.js";
import {
  Button,
  Logo,
  __toESM,
  require_client,
  require_jsx_runtime,
  require_react
} from "./common-ZKMN625A.js";

// src/views/password-reset-expired/index.tsx
var import_react = __toESM(require_react(), 1);
var import_client = __toESM(require_client(), 1);
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
function PasswordResetExpired() {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "page-container flex", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LeftBrandingPanel, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { className: "text-4xl font-bold mb-6", children: "Link Expired" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-xl mb-8 opacity-90", children: "Security is our priority. Reset links expire quickly to keep your account safe." }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "space-y-4 text-left", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center space-x-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-2 h-2 bg-white rounded-full" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Enhanced security protection" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center space-x-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-2 h-2 bg-white rounded-full" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Request a new reset link" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center space-x-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-2 h-2 bg-white rounded-full" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Quick and secure process" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-full lg:w-1/2 flex items-center justify-center p-8 bg-white dark:bg-gray-900 transition-colors duration-200", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "w-full max-w-md", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "lg:hidden text-center mb-8", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { size: 50, className: "justify-center mb-4" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "text-center mb-8", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-red-100 dark:bg-red-900/30 mb-6", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Exclamation, { className: "h-8 w-8 text-red-600 dark:text-red-400" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { className: "text-3xl font-bold text-gray-900 dark:text-white mb-2", children: "Reset Link Expired" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-gray-600 dark:text-gray-400", children: "This password reset link has expired or has already been used. For security reasons, reset links are only valid for a limited time." })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "space-y-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          Button,
          {
            type: "button",
            variant: "primary",
            size: "md",
            fullWidth: true,
            onClick: () => window.location.href = "/forgot-password",
            children: "Request New Reset Link"
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          Button,
          {
            type: "button",
            variant: "outline",
            size: "md",
            fullWidth: true,
            onClick: () => window.location.href = "/signin",
            children: "Back to Sign In"
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-8", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex-shrink-0", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Exclamation, { className: "h-5 w-5 text-orange-400" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "ml-3", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { className: "text-sm text-orange-700 dark:text-orange-300", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Security note:" }),
          " Reset links expire after 24 hours to protect your account from unauthorized access."
        ] }) })
      ] }) }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-6 text-center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { className: "text-sm text-gray-600 dark:text-gray-400", children: [
        "Need help?",
        " ",
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "a",
          {
            href: "mailto:support@teamchat.com",
            className: "font-medium text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors duration-200",
            children: "Contact support"
          }
        )
      ] }) })
    ] }) })
  ] });
}
(0, import_client.createRoot)(document.getElementById("root")).render(
  /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.StrictMode, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PasswordResetExpired, {}) })
);
export {
  PasswordResetExpired as default
};
//# sourceMappingURL=password-reset-expired-XWPBNAYZ.js.map
