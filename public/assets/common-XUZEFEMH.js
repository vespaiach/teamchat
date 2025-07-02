import {
  showError
} from "./common-ZDTFTHKU.js";
import {
  __toESM,
  cx,
  require_jsx_runtime,
  require_react
} from "./common-G5DJCPU6.js";

// frontend/src/utils/remote.ts
async function apiCall(url, options = {}) {
  const defaultHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") || ""
  };
  const headers = {
    ...defaultHeaders,
    ...options.headers
  };
  try {
    const response = await fetch(url, { ...options, headers });
    if (!response.ok) {
      const data = await response.json();
      showError(data.error || "An unexpected error occurred");
      return { success: false, error: data.error || "An unexpected error occurred" };
    }
    return { success: true, data: await response.json() };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
    showError(errorMessage);
    return { success: false, error: errorMessage };
  }
}
function get(url, params) {
  const queryString = params ? "?" + new URLSearchParams(params).toString() : "";
  return apiCall(url + queryString, { method: "GET" });
}
function post(url, body) {
  return apiCall(url, {
    method: "POST",
    body: JSON.stringify(body)
  });
}
function put(url, body) {
  return apiCall(url, { method: "PUT", body: JSON.stringify(body) });
}
function del(url, params) {
  const queryString = params ? "?" + new URLSearchParams(params).toString() : "";
  return apiCall(url + queryString, { method: "DELETE" });
}
function upload(url, body, onProgress) {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    if (onProgress) {
      xhr.upload.addEventListener("progress", (event) => {
        if (event.lengthComputable) {
          const progress = event.loaded / event.total * 100;
          onProgress(progress);
        }
      });
    }
    xhr.addEventListener("load", async () => {
      try {
        if (xhr.status >= 200 && xhr.status < 300) {
          const data = JSON.parse(xhr.responseText);
          resolve({ success: true, data });
        } else {
          const errorData = JSON.parse(xhr.responseText);
          showError(errorData.error || "An unexpected error occurred");
          resolve({ success: false, error: errorData.error || "An unexpected error occurred" });
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unexpected error occurred";
        showError(errorMessage);
        resolve({ success: false, error: errorMessage });
      }
    });
    xhr.addEventListener("error", () => {
      const errorMessage = "Network error occurred";
      showError(errorMessage);
      resolve({ success: false, error: errorMessage });
    });
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content") || "";
    xhr.open("POST", url);
    xhr.setRequestHeader("X-CSRF-Token", csrfToken);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.send(body);
  });
}

// frontend/src/components/IconButton.tsx
var import_react = __toESM(require_react(), 1);

// frontend/src/svgs/Spinner.tsx
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
function Spinner({ className, ...rest }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "svg",
    {
      ...rest,
      className: cx("animate-spin", className),
      xmlns: "http://www.w3.org/2000/svg",
      fill: "none",
      viewBox: "0 0 24 24",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", { className: "opacity-25", cx: "12", cy: "12", r: "10", stroke: "currentColor", strokeWidth: "4" }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "path",
          {
            className: "opacity-75",
            fill: "currentColor",
            d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          }
        )
      ]
    }
  );
}

// frontend/src/components/IconButton.tsx
var import_jsx_runtime2 = __toESM(require_jsx_runtime(), 1);
var sizeClasses = {
  xs: {
    padding: "p-1",
    iconSize: "w-3 h-3",
    minSize: "min-w-[1.75rem] min-h-[1.75rem]"
  },
  sm: {
    padding: "p-1.5",
    iconSize: "w-4 h-4",
    minSize: "min-w-[2rem] min-h-[2rem]"
  },
  md: {
    padding: "p-2",
    iconSize: "w-5 h-5",
    minSize: "min-w-[2.5rem] min-h-[2.5rem]"
  },
  lg: {
    padding: "p-3",
    iconSize: "w-6 h-6",
    minSize: "min-w-[3rem] min-h-[3rem]"
  },
  xl: {
    padding: "p-4",
    iconSize: "w-7 h-7",
    minSize: "min-w-[3.5rem] min-h-[3.5rem]"
  }
};
var variantClasses = {
  primary: cx(
    "text-white border border-transparent shadow-sm bg-primary border-primary",
    "focus:outline-none focus:ring-2 focus:ring-offset-2",
    "dark:focus:ring-offset-gray-900",
    "hover:not-disabled:bg-primary-hover dark:hover:not-disabled:bg-dark-primary-hover"
  ),
  secondary: cx(
    "text-gray-700 bg-gray-100 border border-gray-300 shadow-sm",
    "hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500",
    "dark:text-gray-300 dark:bg-gray-800 dark:border-gray-600 dark:hover:bg-gray-700",
    "dark:focus:ring-offset-gray-900 dark:focus:ring-gray-400"
  ),
  outline: cx(
    "text-gray-700 bg-white border border-gray-300 shadow-sm border-primary text-primary",
    "hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2",
    "dark:text-gray-300 dark:bg-gray-900 dark:border-gray-600 dark:hover:bg-gray-800",
    "dark:focus:ring-offset-gray-900 bg-transparent",
    "hover:not-disabled:bg-primary-light dark:hover:not-disabled:bg-dark-primary-light"
  ),
  ghost: cx(
    "text-gray-700 bg-transparent border border-transparent",
    "hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500",
    "dark:text-gray-300 dark:hover:bg-gray-800 dark:focus:ring-offset-gray-900 dark:focus:ring-gray-400"
  ),
  danger: cx(
    "text-white bg-red-600 border border-transparent shadow-sm",
    "hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500",
    "dark:bg-red-700 dark:hover:bg-red-800 dark:focus:ring-offset-gray-900"
  )
};
var shapeClasses = {
  square: "rounded-lg",
  circle: "rounded-full"
};
function IconButton(props) {
  const {
    icon,
    variant = "ghost",
    size = "md",
    shape = "square",
    loading = false,
    tooltip,
    className = "",
    disabled,
    ref,
    ...rest
  } = props;
  const baseClasses = cx(
    "inline-flex items-center justify-center font-medium",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    "relative group transition duration-200",
    // For tooltip positioning
    sizeClasses[size].padding,
    sizeClasses[size].minSize,
    shapeClasses[shape],
    variantClasses[variant],
    className
  );
  const isDisabled = disabled || loading;
  const renderIcon = (0, import_react.useMemo)(() => {
    if (loading) return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Spinner, { className: sizeClasses[size].iconSize });
    if ((0, import_react.isValidElement)(icon)) {
      const iconElement = icon;
      return (0, import_react.cloneElement)(iconElement, {
        ...iconElement.props,
        className: cx(sizeClasses[size].iconSize, iconElement.props?.className)
      });
    }
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: sizeClasses[size].iconSize, children: icon });
  }, [icon, loading, size]);
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("button", { ...rest, ref, className: baseClasses, disabled: isDisabled, children: [
    renderIcon,
    tooltip && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
      "span",
      {
        className: cx(
          "absolute z-50 px-2 py-1 text-xs font-medium text-white bg-gray-900 rounded",
          "opacity-0 group-hover:opacity-100 transition-opacity duration-200",
          "pointer-events-none whitespace-nowrap",
          "bottom-full left-1/2 transform -translate-x-1/2 mb-2",
          "dark:bg-gray-700"
        ),
        children: [
          tooltip,
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-700" })
        ]
      }
    )
  ] });
}

// frontend/src/utils/transformer.ts
function transformGroupChannel(channel) {
  return {
    id: channel.id,
    name: channel.name,
    description: channel.description,
    isPublic: channel.is_public,
    createdById: channel.created_by_id,
    createdAt: new Date(channel.created_at),
    memberCount: channel.member_count,
    hasUnreadMessages: channel.has_unread_messages,
    isMember: channel.is_member
  };
}
function transformGroupChannels(channels) {
  return channels.map(transformGroupChannel);
}
function transformDirectChannel(channel) {
  return {
    id: channel.id,
    createdById: channel.created_by_id,
    createdAt: new Date(channel.created_at),
    hasUnreadMessages: channel.has_unread_messages,
    participants: channel.participants.map(transformUser)
  };
}
function transformDirectChannels(channels) {
  return channels.map(transformDirectChannel);
}
function transformUser(user) {
  return {
    id: user.id,
    email: user.email,
    avatar: user.avatar,
    firstName: user.first_name,
    lastName: user.last_name,
    name: `${user.first_name} ${user.last_name}`,
    joinedAt: new Date(user.created_at),
    timezone: user.time_zone,
    role: user.role,
    department: user.department
  };
}
function transformUsers(users) {
  return users.map(transformUser);
}

// frontend/src/utils/predefined-data.ts
function getPredefinedData(id) {
  const data = document.getElementById(id)?.textContent;
  if (data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error("Failed to parse user data:", e);
      return null;
    }
  }
  return null;
}

export {
  get,
  post,
  put,
  del,
  upload,
  transformGroupChannel,
  transformGroupChannels,
  transformDirectChannel,
  transformDirectChannels,
  transformUser,
  transformUsers,
  getPredefinedData,
  Spinner,
  IconButton
};
