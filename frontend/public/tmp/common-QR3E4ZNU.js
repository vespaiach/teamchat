import {
  __toESM,
  cx,
  generateRandomId,
  require_jsx_runtime,
  require_react
} from "./common-ZKMN625A.js";

// src/components/TextBox.tsx
var import_react = __toESM(require_react(), 1);
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var sizeClasses = {
  sm: "px-3 py-2 text-sm",
  md: "px-3 py-3 text-base",
  lg: "px-4 py-4 text-lg"
};
var variantClasses = {
  default: "border border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-900 dark:text-white",
  filled: "border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white",
  outlined: "border-2 border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-900 dark:text-white"
};
function TextBox(props) {
  const {
    label,
    error,
    helperText,
    variant = "default",
    size = "md",
    icon,
    iconPosition = "left",
    fullWidth = true,
    required = false,
    className = "",
    id,
    type = "text",
    value,
    disabled = false,
    name,
    placeholder = "",
    onChange,
    onBlur,
    ...rest
  } = props;
  const inputId = (0, import_react.useMemo)(() => id || `textbox-${Math.random().toString(36).substring(2, 9)}`, [id]);
  const baseInputClasses = cx(
    "rounded-lg shadow-sm placeholder-gray-400 dark:placeholder-gray-500",
    "focus:outline-none focus:ring-2 focus:border-transparent focus:ring-blue-600",
    "transition duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed",
    "dark:disabled:bg-gray-800 invalid:ring-primary",
    fullWidth ? "w-full" : "",
    sizeClasses[size],
    variantClasses[variant],
    error ? "border-red-500 focus:ring-red-500 dark:border-red-400 dark:focus:ring-red-400" : "",
    icon ? iconPosition === "left" ? "pl-10" : "pr-10" : "",
    className
  );
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { ...rest, className: fullWidth ? "w-full" : "", children: [
    label && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { htmlFor: inputId, className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: [
      label,
      required && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "text-red-500 dark:text-red-400 ml-1", children: "*" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "relative", children: [
      icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "div",
        {
          className: cx(
            "absolute inset-y-0",
            "flex items-center pointer-events-none text-gray-400 dark:text-gray-500",
            iconPosition === "left" ? "left-0 pl-3" : "right-0 pr-3"
          ),
          children: icon
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
        "input",
        {
          name,
          disabled,
          value,
          required,
          type,
          id: inputId,
          className: baseInputClasses,
          "aria-invalid": error ? "true" : "false",
          "aria-describedby": error ? `${inputId}-error` : helperText ? `${inputId}-helper` : void 0,
          placeholder,
          onChange,
          onBlur
        }
      )
    ] }),
    error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { id: `${inputId}-error`, className: "mt-1 text-sm text-red-600 dark:text-red-400", children: error }),
    helperText && !error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { id: `${inputId}-helper`, className: "mt-1 text-sm text-gray-500 dark:text-gray-400", children: helperText })
  ] });
}
var PasswordTextBox = (0, import_react.forwardRef)(
  ({ showToggle = true, ...props }, ref) => {
    const [showPassword, setShowPassword] = import_react.default.useState(false);
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword);
    };
    const eyeIcon = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "button",
      {
        type: "button",
        onClick: togglePasswordVisibility,
        className: "text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300 transition-colors pointer-events-auto",
        tabIndex: -1,
        children: showPassword ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "path",
          {
            strokeLinecap: "round",
            strokeLinejoin: "round",
            strokeWidth: 2,
            d: "M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
          }
        ) }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" }),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            "path",
            {
              strokeLinecap: "round",
              strokeLinejoin: "round",
              strokeWidth: 2,
              d: "M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            }
          )
        ] })
      }
    );
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      TextBox,
      {
        ref,
        type: showPassword ? "text" : "password",
        icon: showToggle ? eyeIcon : void 0,
        iconPosition: "right",
        ...props
      }
    );
  }
);
PasswordTextBox.displayName = "PasswordTextBox";
var EmailTextBox = (0, import_react.forwardRef)((props, ref) => {
  const emailIcon = /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { className: "w-5 h-5", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "path",
    {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
    }
  ) });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextBox, { ref, type: "email", icon: emailIcon, iconPosition: "left", ...props });
});
EmailTextBox.displayName = "EmailTextBox";

// src/global-contexts/toast/index.tsx
var import_react3 = __toESM(require_react(), 1);

// src/components/ToastItem.tsx
var import_react2 = __toESM(require_react(), 1);

// src/svgs/Error.tsx
var import_jsx_runtime2 = __toESM(require_jsx_runtime(), 1);
function Error(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("svg", { fill: "currentColor", viewBox: "0 0 20 20", ...props, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    "path",
    {
      fillRule: "evenodd",
      d: "M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z",
      clipRule: "evenodd"
    }
  ) });
}

// src/svgs/Success.tsx
var import_jsx_runtime3 = __toESM(require_jsx_runtime(), 1);
function Success(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("svg", { fill: "currentColor", viewBox: "0 0 20 20", ...props, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    "path",
    {
      fillRule: "evenodd",
      d: "M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z",
      clipRule: "evenodd"
    }
  ) });
}

// src/svgs/Warning.tsx
var import_jsx_runtime4 = __toESM(require_jsx_runtime(), 1);
function Warning(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("svg", { fill: "currentColor", viewBox: "0 0 20 20", ...props, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
    "path",
    {
      fillRule: "evenodd",
      d: "M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z",
      clipRule: "evenodd"
    }
  ) });
}

// src/components/ToastItem.tsx
var import_jsx_runtime5 = __toESM(require_jsx_runtime(), 1);
var toastIconTypes = {
  success: "text-green-500 dark:text-green-400",
  error: "text-red-500 dark:text-red-400",
  warning: "text-yellow-500 dark:text-yellow-400"
};
function ToastItem({ toast, className }) {
  const [isVisible, setIsVisible] = (0, import_react2.useState)(false);
  const [isExiting, setIsExiting] = (0, import_react2.useState)(false);
  (0, import_react2.useEffect)(() => {
    const showTimer = setTimeout(() => setIsVisible(true), 10);
    const duration = toast.duration || 8e3;
    const closeTimer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => removeToast(toast.id), 300);
    }, duration);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(closeTimer);
    };
  }, [toast.id, toast.duration]);
  const handleClose = () => {
    setIsExiting(true);
    setTimeout(() => removeToast(toast.id), 300);
  };
  const toastClassNames = (0, import_react2.useMemo)(() => {
    const baseStyles = cx(
      "relative w-full max-w-md p-4 rounded-lg shadow-lg border",
      "transition-all duration-300 ease-in-out transform",
      "dark:shadow-xl"
    );
    const animationStyles = cx(isVisible && !isExiting ? "translate-x-0 opacity-100" : "translate-x-full opacity-0");
    const typeStyles = {
      success: cx(
        "bg-green-50 border-green-200 text-green-800",
        "dark:bg-green-900 dark:border-green-700 dark:text-green-300"
      ),
      error: cx("bg-red-50 border-red-200 text-red-800", "dark:bg-red-900 dark:border-red-700 dark:text-red-300"),
      warning: cx(
        "bg-yellow-50 border-yellow-200 text-yellow-800",
        "dark:bg-yellow-900/20 dark:border-yellow-700 dark:text-yellow-300"
      )
    };
    return cx(baseStyles, animationStyles, typeStyles[toast.type], className);
  }, [isVisible, isExiting, toast.type, className]);
  const iconElement = (0, import_react2.useMemo)(() => {
    switch (toast.type) {
      case "success":
        return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Success, { className: "w-5 h-5" });
      case "error":
        return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Error, { className: "w-5 h-5" });
      case "warning":
        return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Warning, { className: "w-5 h-5" });
    }
  }, [toast.type]);
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: toastClassNames, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex items-start", children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: cx("flex-shrink-0 mr-3 mt-0.5", toastIconTypes[toast.type]), children: iconElement }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex-1 min-w-0", children: [
      toast.title && /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "font-medium text-sm mb-1", children: toast.title }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "text-sm opacity-90", children: toast.message })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
      "button",
      {
        onClick: handleClose,
        className: cx(
          "flex-shrink-0 ml-3 p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10",
          "transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2",
          "focus:ring-gray-500 dark:focus:ring-gray-400"
        ),
        "aria-label": "Close notification",
        children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("svg", { className: "w-4 h-4", fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
          "path",
          {
            fillRule: "evenodd",
            d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
            clipRule: "evenodd"
          }
        ) })
      }
    )
  ] }) });
}

// src/global-contexts/toast/store.ts
var toasts = [];
var listeners = [];
function addToast(toast) {
  const id = generateRandomId();
  toasts = [...toasts, { ...toast, id }];
  emitChange();
}
function removeToast(id) {
  toasts = toasts.filter((toast) => toast.id !== id);
  emitChange();
}
function showSuccess(message, title) {
  addToast({ type: "success", message, title });
}
function showError(message, title) {
  addToast({ type: "error", message, title });
}
function showWarning(message, title) {
  addToast({ type: "warning", message, title });
}
function subscribe(listener) {
  listeners = [...listeners, listener];
  return () => {
    listeners = listeners.filter((l) => l !== listener);
  };
}
function getSnapshot() {
  return toasts;
}
function emitChange() {
  for (const l of listeners) {
    l();
  }
}

// src/global-contexts/toast/index.tsx
var import_jsx_runtime6 = __toESM(require_jsx_runtime(), 1);
function ToastContainer() {
  const toasts2 = (0, import_react3.useSyncExternalStore)(subscribe, getSnapshot);
  if (toasts2.length === 0) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "fixed top-4 right-4 z-50 space-y-2 pointer-events-none", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "pointer-events-auto", children: toasts2.map((toast) => /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "mb-2", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(ToastItem, { toast }) }, toast.id)) }) });
}

export {
  TextBox,
  PasswordTextBox,
  EmailTextBox,
  showSuccess,
  showError,
  showWarning,
  ToastContainer
};
//# sourceMappingURL=common-QR3E4ZNU.js.map
