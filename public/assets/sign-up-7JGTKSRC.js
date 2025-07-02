import {
  Checkbox
} from "./common-XIHFKEPB.js";
import {
  useCSRFToken,
  useShowServerNotifications
} from "./common-2EER4XTJ.js";
import {
  LeftBrandingPanel
} from "./common-TK5XUDO2.js";
import {
  EmailTextBox,
  PasswordTextBox,
  TextBox,
  ToastContainer
} from "./common-ZDTFTHKU.js";
import {
  Button,
  Logo,
  __toESM,
  require_client,
  require_jsx_runtime,
  require_react,
  validateEmail,
  validateName,
  validatePassword
} from "./common-G5DJCPU6.js";

// frontend/src/views/sign-up/index.tsx
var import_react = __toESM(require_react(), 1);
var import_client = __toESM(require_client(), 1);
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
function SignUp() {
  const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
  const { csrfTokenElement } = useCSRFToken();
  const [emailError, setEmailError] = (0, import_react.useState)(null);
  const [passwordError, setPasswordError] = (0, import_react.useState)(null);
  const [firstNameError, setFirstNameError] = (0, import_react.useState)(null);
  const [lastNameError, setLastNameError] = (0, import_react.useState)(null);
  const [confirmPasswordError, setConfirmPasswordError] = (0, import_react.useState)(null);
  useShowServerNotifications();
  const validateConfirmPassword = (password, confirmPassword) => {
    if (!confirmPassword) {
      return "Please confirm your password";
    }
    if (password !== confirmPassword) {
      return "Passwords do not match";
    }
    return null;
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setEmailError(null);
    setPasswordError(null);
    setFirstNameError(null);
    setLastNameError(null);
    setConfirmPasswordError(null);
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    const confirmPassword = formData.get("confirm_password");
    const firstName = formData.get("first_name");
    const lastName = formData.get("last_name");
    const emailValidationError = validateEmail(email);
    const passwordValidationError = validatePassword(password);
    const firstNameValidationError = validateName(firstName, "First name");
    const lastNameValidationError = validateName(lastName, "Last name");
    const confirmPasswordValidationError = validateConfirmPassword(password, confirmPassword);
    if (emailValidationError) {
      setEmailError(emailValidationError);
    }
    if (passwordValidationError) {
      setPasswordError(passwordValidationError);
    }
    if (firstNameValidationError) {
      setFirstNameError(firstNameValidationError);
    }
    if (lastNameValidationError) {
      setLastNameError(lastNameValidationError);
    }
    if (confirmPasswordValidationError) {
      setConfirmPasswordError(confirmPasswordValidationError);
    }
    if (emailValidationError || passwordValidationError || firstNameValidationError || lastNameValidationError || confirmPasswordValidationError) {
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
  const handleFirstNameBlur = (event) => {
    const firstName = event.target.value;
    const error = validateName(firstName, "First name");
    setFirstNameError(error);
  };
  const handleLastNameBlur = (event) => {
    const lastName = event.target.value;
    const error = validateName(lastName, "Last name");
    setLastNameError(error);
  };
  const handleConfirmPasswordBlur = (event) => {
    const confirmPassword = event.target.value;
    const form = event.target.form;
    const password = form?.elements.namedItem("password");
    const error = validateConfirmPassword(password?.value || "", confirmPassword);
    setConfirmPasswordError(error);
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
    if (confirmPasswordError) {
      setConfirmPasswordError(null);
    }
  };
  const handleFirstNameChange = () => {
    if (firstNameError) {
      setFirstNameError(null);
    }
  };
  const handleLastNameChange = () => {
    if (lastNameError) {
      setLastNameError(null);
    }
  };
  const handleConfirmPasswordChange = () => {
    if (confirmPasswordError) {
      setConfirmPasswordError(null);
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
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { className: "text-3xl font-bold text-gray-900 dark:text-white mb-2", children: "Create your account" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-gray-600 dark:text-gray-400", children: "Get started with TeamChat today" })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", { className: "space-y-6", method: "post", action: "/signup", onSubmit: handleSubmit, children: [
        csrfTokenElement,
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-4", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            TextBox,
            {
              name: "first_name",
              label: "First Name",
              placeholder: "John",
              autoComplete: "given-name",
              required: true,
              error: firstNameError || void 0,
              disabled: isSubmitting,
              onBlur: handleFirstNameBlur,
              onChange: handleFirstNameChange
            }
          ) }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            TextBox,
            {
              name: "last_name",
              label: "Last Name",
              placeholder: "Doe",
              autoComplete: "family-name",
              required: true,
              error: lastNameError || void 0,
              disabled: isSubmitting,
              onBlur: handleLastNameBlur,
              onChange: handleLastNameChange
            }
          ) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          EmailTextBox,
          {
            name: "email",
            label: "Email Address",
            placeholder: "john.doe@company.com",
            autoComplete: "email",
            required: true,
            error: emailError || void 0,
            disabled: isSubmitting,
            onBlur: handleEmailBlur,
            onChange: handleEmailChange
          }
        ) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          PasswordTextBox,
          {
            name: "password",
            label: "Password",
            placeholder: "Create a strong password",
            autoComplete: "new-password",
            helperText: "Must be at least 6 characters with numbers and letters",
            required: true,
            error: passwordError || void 0,
            disabled: isSubmitting,
            onBlur: handlePasswordBlur,
            onChange: handlePasswordChange
          }
        ) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          PasswordTextBox,
          {
            name: "confirm_password",
            label: "Confirm Password",
            placeholder: "Confirm your password",
            autoComplete: "new-password",
            required: true,
            error: confirmPasswordError || void 0,
            disabled: isSubmitting,
            onBlur: handleConfirmPasswordBlur,
            onChange: handleConfirmPasswordChange
          }
        ) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Checkbox, { id: "terms", name: "terms", disabled: isSubmitting, children: [
          "I agree to the",
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "a",
            {
              href: "#",
              className: "font-medium transition duration-200 hover:opacity-80 text-primary dark:text-dark-primary",
              children: "Terms of Service"
            }
          ),
          " ",
          "and",
          " ",
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "a",
            {
              href: "#",
              className: "font-medium transition duration-200 hover:opacity-80 text-primary dark:text-dark-primary",
              children: "Privacy Policy"
            }
          )
        ] }) }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, { type: "submit", variant: "primary", size: "md", fullWidth: true, disabled: isSubmitting, children: isSubmitting ? "Creating Account..." : "Create Account" }) })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { className: "mt-8 text-center text-sm text-gray-600 dark:text-gray-400", children: [
        "Already have an account?",
        " ",
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "a",
          {
            href: "/signin",
            className: "font-medium transition duration-200 hover:opacity-80 text-primary dark:text-dark-primary",
            children: "Sign in here"
          }
        )
      ] })
    ] }) })
  ] });
}
(0, import_client.createRoot)(document.getElementById("root")).render(
  /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.StrictMode, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SignUp, {}),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ToastContainer, {})
  ] })
);
export {
  SignUp as default
};
