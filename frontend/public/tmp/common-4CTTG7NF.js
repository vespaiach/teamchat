import {
  showError,
  showSuccess,
  showWarning
} from "./common-QR3E4ZNU.js";
import {
  __toESM,
  require_jsx_runtime,
  require_react
} from "./common-ZKMN625A.js";

// src/hooks/useShowServerNotifications.ts
var import_react = __toESM(require_react(), 1);
function useShowServerNotifications() {
  const showRef = (0, import_react.useRef)(null);
  showRef.current = (noti) => {
    switch (noti.type) {
      case "error":
        showError(noti.message, noti.title ?? "Error");
        break;
      case "success":
        showSuccess(noti.message, noti.title ?? "Success");
        break;
      case "warning":
        showWarning(noti.message, noti.title ?? "Warning");
        break;
      default:
        console.warn("Unknown notification type:", noti.type);
    }
  };
  (0, import_react.useEffect)(() => {
    const notificationStrings = document.getElementById("server-notifications")?.textContent;
    if (notificationStrings && showRef.current) {
      try {
        const parsedErrors = JSON.parse(notificationStrings);
        parsedErrors.forEach(showRef.current);
      } catch (e) {
        console.error("Failed to parse app errors:", e);
      }
    }
  }, []);
}

// src/hooks/useCSRFToken.tsx
var import_react2 = __toESM(require_react(), 1);
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
function useCSRFToken() {
  const [csrfToken, setCsrfToken] = (0, import_react2.useState)(null);
  const csrfTokenElement = (0, import_react2.useMemo)(() => {
    return csrfToken ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { type: "hidden", name: "authenticity_token", value: csrfToken }) : null;
  }, [csrfToken]);
  (0, import_react2.useEffect)(() => {
    setCsrfToken(document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") ?? null);
  }, []);
  return {
    csrfToken,
    csrfTokenElement
  };
}

export {
  useShowServerNotifications,
  useCSRFToken
};
//# sourceMappingURL=common-4CTTG7NF.js.map
