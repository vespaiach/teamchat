import {
  useCSRFToken,
  useShowServerNotifications
} from "./common-2EER4XTJ.js";
import {
  LeftBrandingPanel
} from "./common-TK5XUDO2.js";
import {
  PasswordTextBox,
  ToastContainer
} from "./common-ZDTFTHKU.js";
import {
  Button,
  Logo,
  __toESM,
  require_client,
  require_jsx_runtime,
  require_react,
  validatePassword
} from "./common-G5DJCPU6.js";

// frontend/src/views/reset-password/index.tsx
var import_react = __toESM(require_react(), 1);
var import_client = __toESM(require_client(), 1);
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var token = window.location.pathname.split("/").pop() || "";
function ResetPassword() {
  const { csrfTokenElement } = useCSRFToken();
  const [passwordError, setPasswordError] = (0, import_react.useState)(null);
  const [confirmPasswordError, setConfirmPasswordError] = (0, import_react.useState)(null);
  const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
  useShowServerNotifications();
  if (!token) {
    window.location.href = "/signin";
    return;
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    setPasswordError(null);
    setConfirmPasswordError(null);
    const formData = new FormData(event.currentTarget);
    const password = formData.get("password");
    const confirmPassword = formData.get("password_confirmation");
    const passwordValidationError = validatePassword(password);
    let confirmPasswordValidationError = null;
    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
    }
    if (!confirmPassword) {
      confirmPasswordValidationError = "Please confirm your password";
    } else if (password !== confirmPassword) {
      confirmPasswordValidationError = "Passwords do not match";
    }
    if (confirmPasswordValidationError) {
      setConfirmPasswordError(confirmPasswordValidationError);
    }
    if (passwordValidationError || confirmPasswordValidationError) {
      return;
    }
    setIsSubmitting(true);
    event.currentTarget.submit();
  };
  const handlePasswordBlur = (event) => {
    const password = event.target.value;
    const error = validatePassword(password);
    setPasswordError(error);
  };
  const handleConfirmPasswordBlur = (event) => {
    const confirmPassword = event.target.value;
    const form = event.target.closest("form");
    const passwordInput = form?.querySelector('input[name="password"]');
    const password = passwordInput?.value || "";
    let error = null;
    if (!confirmPassword) {
      error = "Please confirm your password";
    } else if (password !== confirmPassword) {
      error = "Passwords do not match";
    }
    setConfirmPasswordError(error);
  };
  const handlePasswordChange = () => {
    if (passwordError) {
      setPasswordError(null);
    }
  };
  const handleConfirmPasswordChange = () => {
    if (confirmPasswordError) {
      setConfirmPasswordError(null);
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "page-container flex", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LeftBrandingPanel, { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { className: "text-4xl font-bold mb-6", children: "Create New Password" }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-xl mb-8 opacity-90", children: "You're almost there! Create a strong new password to secure your account." }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "space-y-4 text-left", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center space-x-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-2 h-2 bg-white rounded-full" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "At least 8 characters" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center space-x-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-2 h-2 bg-white rounded-full" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Include numbers and letters" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center space-x-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-2 h-2 bg-white rounded-full" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Mix of uppercase and lowercase" })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center space-x-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-2 h-2 bg-white rounded-full" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Consider special characters" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "w-full lg:w-1/2 flex items-center justify-center p-8 bg-white dark:bg-gray-900 transition-colors duration-200", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "w-full max-w-md", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "lg:hidden text-center mb-8", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { size: 50, className: "justify-center mb-4" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "text-center mb-8", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { className: "text-3xl font-bold text-gray-900 dark:text-white mb-2", children: "Reset your password" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-gray-600 dark:text-gray-400", children: "Enter your new password below to complete the reset process." })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", { className: "space-y-6", method: "post", action: `/reset-password/${token}`, onSubmit: handleSubmit, children: [
        csrfTokenElement,
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          PasswordTextBox,
          {
            name: "password",
            label: "New Password",
            placeholder: "Enter your new password",
            autoComplete: "new-password",
            helperText: "Must be at least 8 characters with numbers and letters",
            required: true,
            error: passwordError || void 0,
            disabled: isSubmitting,
            onBlur: handlePasswordBlur,
            onChange: handlePasswordChange
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          PasswordTextBox,
          {
            name: "password_confirmation",
            label: "Confirm New Password",
            placeholder: "Confirm your new password",
            autoComplete: "new-password",
            required: true,
            error: confirmPasswordError || void 0,
            disabled: isSubmitting,
            onBlur: handleConfirmPasswordBlur,
            onChange: handleConfirmPasswordChange
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, { type: "submit", variant: "primary", size: "md", fullWidth: true, disabled: isSubmitting, children: isSubmitting ? "Updating Password..." : "Update Password" }) })
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
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResetPassword, {}),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastContainer, {})
  ] })
);
export {
  ResetPassword as default
};
