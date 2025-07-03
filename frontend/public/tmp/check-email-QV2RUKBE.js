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

// src/views/check-email/index.tsx
var import_react = __toESM(require_react(), 1);
var import_client = __toESM(require_client(), 1);

// src/svgs/Email.tsx
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
function Email(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", ...props, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "path",
    {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    }
  ) });
}

// src/views/check-email/index.tsx
var import_jsx_runtime2 = __toESM(require_jsx_runtime(), 1);
function CheckEmail() {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "page-container flex", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(LeftBrandingPanel, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h1", { className: "text-4xl font-bold mb-6", children: "Check Your Inbox" }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "text-xl mb-8 opacity-90", children: "We've sent you detailed instructions to reset your password securely." }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "space-y-4 text-left", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "flex items-center space-x-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "w-2 h-2 bg-white rounded-full" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: "Email sent instantly" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "flex items-center space-x-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "w-2 h-2 bg-white rounded-full" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: "Check spam folder if needed" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "flex items-center space-x-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "w-2 h-2 bg-white rounded-full" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: "Link expires in 24 hours" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "w-full lg:w-1/2 flex items-center justify-center p-8 bg-white dark:bg-gray-900 transition-colors duration-200", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "w-full max-w-md", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "lg:hidden text-center mb-8", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Logo, { size: 50, className: "justify-center mb-4" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "text-center mb-8", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "mx-auto flex items-center justify-center h-16 w-16 rounded-full mb-6 bg-primary-light dark:bg-primary-dark", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Email, { className: "h-8 w-8 text-primary dark:text-dark-primary" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h2", { className: "text-3xl font-bold text-gray-900 dark:text-white mb-2", children: "Check your email" }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "text-gray-600 dark:text-gray-400", children: "We've sent password reset instructions to your email address." })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "space-y-4", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        Button,
        {
          type: "button",
          variant: "primary",
          size: "md",
          fullWidth: true,
          onClick: () => window.location.href = "/signin",
          children: "Back to Sign In"
        }
      ) }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "mt-8", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "flex", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "flex-shrink-0", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Exclamation, { className: "h-5 w-5 text-blue-400" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "ml-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h3", { className: "text-sm font-medium text-blue-800 dark:text-blue-300", children: "Didn't receive the email?" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "mt-2 text-sm text-blue-700 dark:text-blue-400", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("ul", { className: "list-disc list-inside space-y-1", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("li", { children: "Check your spam or junk folder" }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("li", { children: "Make sure you entered the correct email address" }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("li", { children: "Wait a few minutes for the email to arrive" })
          ] }) })
        ] })
      ] }) }) }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "mt-6 text-center", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("p", { className: "text-sm text-gray-600 dark:text-gray-400", children: [
        "Need help?",
        " ",
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          "a",
          {
            href: "mailto:nta.toan@gmail.com",
            className: "font-medium transition duration-200 hover:opacity-80 text-primary dark:text-dark-primary",
            children: "Contact support"
          }
        )
      ] }) })
    ] }) })
  ] });
}
(0, import_client.createRoot)(document.getElementById("root")).render(
  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_react.StrictMode, { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(CheckEmail, {}) })
);
export {
  CheckEmail as default
};
//# sourceMappingURL=check-email-QV2RUKBE.js.map
