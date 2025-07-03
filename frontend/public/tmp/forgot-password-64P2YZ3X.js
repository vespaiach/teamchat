import {
  useCSRFToken,
  useShowServerNotifications
} from "./common-4CTTG7NF.js";
import {
  LeftBrandingPanel
} from "./common-GTO3E3AZ.js";
import {
  EmailTextBox,
  ToastContainer
} from "./common-QR3E4ZNU.js";
import {
  Button,
  Logo,
  __toESM,
  require_client,
  require_jsx_runtime,
  require_react,
  validateEmail
} from "./common-ZKMN625A.js";

// src/views/forgot-password/index.tsx
var import_react = __toESM(require_react(), 1);
var import_client = __toESM(require_client(), 1);
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
function ForgotPassword() {
  const { csrfTokenElement } = useCSRFToken();
  const [emailError, setEmailError] = (0, import_react.useState)(null);
  const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
  useShowServerNotifications();
  const handleSubmit = (event) => {
    event.preventDefault();
    setEmailError(null);
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const emailValidationError = validateEmail(email);
    if (emailValidationError) {
      setEmailError(emailValidationError);
      return;
    }
    setIsSubmitting(true);
    event.currentTarget.submit();
  };
  const handleEmailBlur = (event) => {
    const email = event.target.value;
    const error = validateEmail(email);
    setEmailError(error);
  };
  const handleEmailChange = () => {
    if (emailError) {
      setEmailError(null);
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "page-container flex", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LeftBrandingPanel, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { className: "text-4xl font-bold mb-6", children: "Password Recovery" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-xl mb-8 opacity-90", children: "Don't worry, it happens to the best of us. We'll help you get back into your account." }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "space-y-4 text-left", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center space-x-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-2 h-2 bg-white rounded-full" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Secure password reset" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center space-x-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-2 h-2 bg-white rounded-full" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Email verification" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center space-x-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-2 h-2 bg-white rounded-full" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Account protection" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-full lg:w-1/2 flex items-center justify-center p-8 bg-white dark:bg-gray-900 transition-colors duration-200", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "w-full max-w-md", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "lg:hidden text-center mb-8", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { size: 50, className: "justify-center mb-4" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "text-center mb-8", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { className: "text-3xl font-bold text-gray-900 dark:text-white mb-2", children: "Forgot your password?" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-gray-600 dark:text-gray-400", children: "No worries! Enter your email and we'll send you reset instructions." })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", { className: "space-y-6", method: "post", action: "/forgot-password", onSubmit: handleSubmit, children: [
        csrfTokenElement,
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          EmailTextBox,
          {
            name: "email",
            label: "Email Address",
            placeholder: "Enter your email address",
            autoComplete: "email",
            helperText: "We'll send password reset instructions to this email",
            error: emailError || void 0,
            disabled: isSubmitting,
            onBlur: handleEmailBlur,
            onChange: handleEmailChange,
            required: true
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, { type: "submit", variant: "primary", size: "md", fullWidth: true, disabled: isSubmitting, children: isSubmitting ? "Sending..." : "Send Reset Instructions" }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-6 text-center", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { className: "text-sm text-gray-600 dark:text-gray-400", children: [
        "Remember your password?",
        " ",
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "a",
          {
            href: "/signin",
            className: "font-medium transition duration-200 hover:opacity-80 text-primary dark:text-dark-primary",
            children: "Back to sign in"
          }
        )
      ] }) })
    ] }) })
  ] });
}
(0, import_client.createRoot)(document.getElementById("root")).render(
  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.StrictMode, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ForgotPassword, {}),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastContainer, {})
  ] })
);
export {
  ForgotPassword as default
};
//# sourceMappingURL=forgot-password-64P2YZ3X.js.map
