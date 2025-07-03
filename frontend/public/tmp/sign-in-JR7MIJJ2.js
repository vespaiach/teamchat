import {
  Checkbox
} from "./common-ZYHBS7DU.js";
import {
  useCSRFToken,
  useShowServerNotifications
} from "./common-4CTTG7NF.js";
import {
  LeftBrandingPanel
} from "./common-GTO3E3AZ.js";
import {
  EmailTextBox,
  PasswordTextBox,
  ToastContainer
} from "./common-QR3E4ZNU.js";
import {
  Button,
  Logo,
  __toESM,
  require_client,
  require_jsx_runtime,
  require_react,
  validateEmail,
  validatePassword
} from "./common-ZKMN625A.js";

// src/views/sign-in/index.tsx
var import_react = __toESM(require_react(), 1);
var import_client = __toESM(require_client(), 1);
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
function SignIn() {
  const { csrfTokenElement } = useCSRFToken();
  const [emailError, setEmailError] = (0, import_react.useState)(null);
  const [passwordError, setPasswordError] = (0, import_react.useState)(null);
  const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
  useShowServerNotifications();
  const handleSubmit = (event) => {
    event.preventDefault();
    setEmailError(null);
    setPasswordError(null);
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    const emailValidationError = validateEmail(email);
    const passwordValidationError = validatePassword(password);
    if (emailValidationError) {
      setEmailError(emailValidationError);
    }
    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
    }
    if (emailValidationError || passwordValidationError) {
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
  const handlePasswordBlur = (event) => {
    const password = event.target.value;
    const error = validatePassword(password);
    setPasswordError(error);
  };
  const handleEmailChange = () => {
    if (emailError) {
      setEmailError(null);
    }
  };
  const handlePasswordChange = () => {
    if (passwordError) {
      setPasswordError(null);
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "page-container flex", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LeftBrandingPanel, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { className: "text-4xl font-bold mb-6", children: "TeamChat" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-xl mb-8 opacity-90", children: "Bring your team together with seamless communication and collaboration." }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "space-y-4 text-left", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center space-x-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-2 h-2 bg-white rounded-full" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Real-time messaging" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center space-x-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-2 h-2 bg-white rounded-full" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "File sharing & collaboration" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center space-x-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-2 h-2 bg-white rounded-full" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Organized channels & threads" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-full lg:w-1/2 flex items-center justify-center p-8 bg-white dark:bg-gray-900 transition-colors duration-200", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "w-full max-w-md", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "lg:hidden text-center mb-8", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { size: 50, className: "justify-center mb-4" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "text-center mb-8", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { className: "text-3xl font-bold text-gray-900 dark:text-white mb-2", children: "Sign in to TeamChat" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-gray-600 dark:text-gray-400", children: "Welcome back! Please enter your details." })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", { className: "space-y-6", method: "post", action: "/signin", onSubmit: handleSubmit, children: [
        csrfTokenElement,
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          EmailTextBox,
          {
            name: "email",
            label: "Email",
            placeholder: "Enter your email",
            required: true,
            error: emailError || void 0,
            disabled: isSubmitting,
            onBlur: handleEmailBlur,
            onChange: handleEmailChange
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          PasswordTextBox,
          {
            name: "password",
            label: "Password",
            placeholder: "Enter your password",
            required: true,
            error: passwordError || void 0,
            disabled: isSubmitting,
            onBlur: handlePasswordBlur,
            onChange: handlePasswordChange
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, { id: "remember-me", name: "remember_me", value: "true", disabled: isSubmitting, children: "Remember me" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "text-sm", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "a",
            {
              href: "/forgot-password",
              className: "font-medium transition duration-200 hover:opacity-80 text-primary dark:text-dark-primary",
              children: "Forgot your password?"
            }
          ) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, { type: "submit", variant: "primary", size: "md", fullWidth: true, disabled: isSubmitting, children: isSubmitting ? "Signing in..." : "Sign in" }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { className: "mt-8 text-center text-sm text-gray-600 dark:text-gray-400", children: [
        "Don't have an account?",
        " ",
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "a",
          {
            href: "/signup",
            className: "font-medium transition duration-200 hover:opacity-80 text-primary dark:text-dark-primary",
            children: "Sign up for free"
          }
        )
      ] })
    ] }) })
  ] });
}
(0, import_client.createRoot)(document.getElementById("root")).render(
  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.StrictMode, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignIn, {}),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastContainer, {})
  ] })
);
export {
  SignIn
};
//# sourceMappingURL=sign-in-JR7MIJJ2.js.map
