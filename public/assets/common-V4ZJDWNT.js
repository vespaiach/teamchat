import {
  IconButton
} from "./common-XUZEFEMH.js";
import {
  Logo,
  __toESM,
  cx,
  require_jsx_runtime,
  require_react
} from "./common-G5DJCPU6.js";

// frontend/src/svgs/LogOut.tsx
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
function LogOut(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", ...props, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "path",
    {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
    }
  ) });
}

// frontend/src/svgs/ChevronLeft.tsx
var import_jsx_runtime2 = __toESM(require_jsx_runtime(), 1);
function ChevronLeft(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", ...props, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 19l-7-7 7-7" }) });
}

// frontend/src/components/Header.tsx
var import_jsx_runtime3 = __toESM(require_jsx_runtime(), 1);
function Header({ pageTitle, children, onBack }) {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("header", { className: "bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors duration-200", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex justify-between items-center h-16", children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex items-center", children: [
      onBack && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(IconButton, { icon: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ChevronLeft, { className: "h-6 w-6", onClick: onBack }) }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Logo, { size: 32, className: "mr-5" }),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("h1", { className: "text-xl font-semibold text-gray-900 dark:text-white", children: pageTitle })
    ] }),
    children
  ] }) }) });
}

// frontend/src/components/Box.tsx
var import_jsx_runtime4 = __toESM(require_jsx_runtime(), 1);
function Box({
  children,
  className,
  headerRNode
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
    "div",
    {
      className: cx(
        "bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700",
        className
      ),
      children: [
        Boolean(headerRNode) && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "p-5 border-b border-gray-200 dark:border-gray-700", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "flex items-center justify-between", children: headerRNode }) }),
        children
      ]
    }
  );
}

// frontend/src/components/MenuItem.tsx
var import_jsx_runtime5 = __toESM(require_jsx_runtime(), 1);
function MenuItem({ iconRNode, labelRNode, className, ...rest }) {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
    "button",
    {
      ...rest,
      className: cx(
        `w-full text-left px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center gap-2 cursor-pointer`,
        className
      ),
      children: [
        iconRNode,
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { children: labelRNode })
      ]
    }
  );
}

// frontend/src/hooks/useClickOutside.tsx
var import_react = __toESM(require_react(), 1);
function useClickOutside(cb) {
  const elementRef = (0, import_react.useRef)(null);
  const callbackRef = (0, import_react.useRef)(cb);
  callbackRef.current = cb;
  (0, import_react.useEffect)(() => {
    const handler = (e) => {
      const element = elementRef.current;
      if (element && !element.contains(e.target)) {
        callbackRef.current(e);
      }
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, []);
  return elementRef;
}

// frontend/src/components/Modal.tsx
var import_react2 = __toESM(require_react(), 1);

// frontend/src/svgs/X.tsx
var import_jsx_runtime6 = __toESM(require_jsx_runtime(), 1);
function X(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("svg", { ...props, fill: "currentColor", viewBox: "0 0 20 20", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
    "path",
    {
      fillRule: "evenodd",
      d: "M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z",
      clipRule: "evenodd"
    }
  ) });
}

// frontend/src/components/Modal.tsx
var import_jsx_runtime7 = __toESM(require_jsx_runtime(), 1);
var sizeClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl"
};
function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = "md",
  closeOnBackdropClick = true,
  closeOnEscape = true,
  showCloseButton = true
}) {
  const closeRef = (0, import_react2.useRef)(() => {
  });
  closeRef.current = () => {
    onClose(false);
  };
  (0, import_react2.useEffect)(() => {
    if (!isOpen || !closeOnEscape) return;
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        closeRef.current();
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, closeOnEscape]);
  (0, import_react2.useEffect)(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);
  const handleBackdropClick = (0, import_react2.useCallback)(
    (e) => {
      if (e.target === e.currentTarget && closeOnBackdropClick) {
        closeRef.current();
      }
    },
    [closeOnBackdropClick]
  );
  if (!isOpen) return null;
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
    "div",
    {
      className: "fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4",
      onClick: handleBackdropClick,
      children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
        "div",
        {
          className: `bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full ${sizeClasses[size]} transition-colors duration-200`,
          onClick: (e) => e.stopPropagation(),
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "px-6 py-4 border-b border-gray-200 dark:border-gray-700", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("h2", { className: "text-lg font-semibold text-gray-900 dark:text-white", children: title }),
              showCloseButton && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(IconButton, { shape: "circle", icon: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(X, { className: "h-6 w-6" }), onClick: closeRef.current })
            ] }) }),
            /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "px-6 py-4", children }),
            footer && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "px-6 py-4 bg-gray-50 dark:bg-gray-700/50 rounded-b-lg border-t border-gray-200 dark:border-gray-700", children: footer })
          ]
        }
      )
    }
  );
}

export {
  LogOut,
  MenuItem,
  useClickOutside,
  Header,
  Box,
  Modal
};
