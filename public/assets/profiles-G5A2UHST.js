import {
  Box,
  Header,
  LogOut,
  MenuItem,
  Modal,
  useClickOutside
} from "./common-V4ZJDWNT.js";
import {
  IconButton,
  del,
  getPredefinedData,
  put,
  transformUser,
  upload
} from "./common-XUZEFEMH.js";
import {
  TextBox,
  ToastContainer,
  showError,
  showSuccess
} from "./common-ZDTFTHKU.js";
import {
  Button,
  __toESM,
  cx,
  dateToMDY,
  require_client,
  require_jsx_runtime,
  require_react
} from "./common-G5DJCPU6.js";

// frontend/src/views/profiles/index.tsx
var import_react7 = __toESM(require_react(), 1);
var import_client = __toESM(require_client(), 1);

// frontend/src/views/profiles/store.tsx
var import_react = __toESM(require_react(), 1);
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var userResponse = getPredefinedData("logged-in-user");
if (!userResponse) {
  throw new Error("User data not found. Ensure the user data is embedded in the HTML.");
}
var ProfilesStoreContext = (0, import_react.createContext)({
  loggedInUser: transformUser(userResponse),
  setLoggedInUser: () => {
  }
});
function ProfilesStoreProvider({ children }) {
  const [loggedInUser, setLoggedInUser] = (0, import_react.useState)(transformUser(userResponse));
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfilesStoreContext.Provider, { value: { loggedInUser, setLoggedInUser }, children });
}
function useProfilesStore() {
  const context = (0, import_react.useContext)(ProfilesStoreContext);
  if (!context) {
    throw new Error("useProfilesStore must be used within a ProfilesStoreProvider");
  }
  return context;
}

// frontend/src/views/profiles/components/AvatarAndStats.tsx
var import_react4 = __toESM(require_react(), 1);

// frontend/src/components/StatusIndicator.tsx
var import_jsx_runtime2 = __toESM(require_jsx_runtime(), 1);
var colors = {
  online: "bg-green-500",
  offline: "bg-gray-400"
};
var sizeClasses = {
  small: "w-3 h-3",
  medium: "w-5 h-5",
  large: "w-6 h-6"
};
function StatusIndicator({ status, size = "small" }) {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    "div",
    {
      className: cx("rounded-full border border-white dark:border-gray-800", colors[status], sizeClasses[size])
    }
  );
}

// frontend/src/components/AvatarEditDropdown.tsx
var import_react2 = __toESM(require_react(), 1);

// frontend/src/svgs/Edit.tsx
var import_jsx_runtime3 = __toESM(require_jsx_runtime(), 1);
function Edit(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", ...props, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    "path",
    {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
    }
  ) });
}

// frontend/src/svgs/Camera.tsx
var import_jsx_runtime4 = __toESM(require_jsx_runtime(), 1);
function Camera(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", ...props, children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      "path",
      {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
        d: "M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 13a3 3 0 11-6 0 3 3 0 016 0z" })
  ] });
}

// frontend/src/svgs/Upload.tsx
var import_jsx_runtime5 = __toESM(require_jsx_runtime(), 1);
function Upload(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", ...props, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
    "path",
    {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
    }
  ) });
}

// frontend/src/components/AvatarEditDropdown.tsx
var import_jsx_runtime6 = __toESM(require_jsx_runtime(), 1);
function AvatarEditDropdown({
  className,
  onCameraCapture,
  onFileUpload,
  disabled = false
}) {
  const [isOpen, setIsOpen] = (0, import_react2.useState)(false);
  const fileInputRef = (0, import_react2.useRef)(null);
  const dropdownRef = useClickOutside(() => {
    setIsOpen(false);
  });
  const handleCameraClick = () => {
    if (disabled) return;
    setIsOpen(false);
    onCameraCapture?.();
  };
  const handleUploadClick = () => {
    if (disabled) return;
    setIsOpen(false);
    fileInputRef.current?.click();
  };
  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      onFileUpload?.(file);
      event.target.value = "";
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: cx("relative", className), children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
      "button",
      {
        onClick: () => !disabled && setIsOpen(!isOpen),
        disabled,
        className: cx(
          "absolute -bottom-1 -right-1 w-8 h-8 rounded-full",
          "bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600",
          "hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200",
          "flex items-center justify-center shadow-sm",
          disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
        ),
        "aria-label": "Edit avatar",
        title: disabled ? "Upload in progress..." : "Edit avatar",
        children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Edit, { className: "w-4 h-4 text-gray-600 dark:text-gray-400" })
      }
    ),
    isOpen && !disabled && /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
      "div",
      {
        ref: dropdownRef,
        className: cx(
          "absolute -right-2 top-8 w-48 z-50",
          "bg-white dark:bg-gray-800 rounded-lg shadow-lg",
          "border border-gray-200 dark:border-gray-700 py-1"
        ),
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
            MenuItem,
            {
              onClick: handleCameraClick,
              className: "text-gray-700 dark:text-gray-300",
              iconRNode: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Camera, { className: "h-4 w-4" }),
              labelRNode: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { children: "Take Photo" })
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
            MenuItem,
            {
              onClick: handleUploadClick,
              className: "text-gray-700 dark:text-gray-300",
              iconRNode: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Upload, { className: "h-4 w-4" }),
              labelRNode: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { children: "Upload Photo" })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
      "input",
      {
        ref: fileInputRef,
        type: "file",
        accept: "image/jpeg,image/jpg,image/png,image/gif,image/webp",
        onChange: handleFileChange,
        disabled,
        className: "hidden",
        "aria-label": "Upload avatar image"
      }
    )
  ] });
}

// frontend/src/components/ProgressBar.tsx
var import_jsx_runtime7 = __toESM(require_jsx_runtime(), 1);
var colorClasses = {
  primary: "bg-blue-600",
  success: "bg-green-600",
  warning: "bg-yellow-600",
  danger: "bg-red-600"
};
var sizeClasses2 = {
  sm: "h-1",
  md: "h-2",
  lg: "h-3"
};
function ProgressBar({
  progress,
  className = "",
  showPercentage = false,
  color = "primary",
  size = "md"
}) {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: cx("w-full", className), children: [
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: cx("bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden", sizeClasses2[size]), children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
      "div",
      {
        className: cx("transition-all duration-300 ease-out rounded-full", colorClasses[color], sizeClasses2[size]),
        style: { width: `${clampedProgress}%` }
      }
    ) }),
    showPercentage && /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "text-xs text-gray-600 dark:text-gray-400 mt-1 text-center", children: [
      Math.round(clampedProgress),
      "%"
    ] })
  ] });
}

// frontend/src/components/CameraModal.tsx
var import_react3 = __toESM(require_react(), 1);
var import_jsx_runtime8 = __toESM(require_jsx_runtime(), 1);
function CameraModal({ isOpen, onClose, onCapture }) {
  const videoRef = (0, import_react3.useRef)(null);
  const canvasRef = (0, import_react3.useRef)(null);
  const startRef = (0, import_react3.useRef)(() => {
  });
  const stopRef = (0, import_react3.useRef)(() => {
  });
  const [stream, setStream] = (0, import_react3.useState)(null);
  const [isCapturing, setIsCapturing] = (0, import_react3.useState)(false);
  const [hasPermission, setHasPermission] = (0, import_react3.useState)(null);
  startRef.current = async () => {
    try {
      setHasPermission(null);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 640 },
          facingMode: "user"
          // Front camera for selfies
        }
      });
      setStream(mediaStream);
      setHasPermission(true);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error("Camera access denied or not available:", error);
      setHasPermission(false);
      showError("Camera access is required to take a photo. Please enable camera permissions.");
    }
  };
  stopRef.current = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    setHasPermission(null);
  };
  (0, import_react3.useEffect)(() => {
    if (isOpen) {
      startRef.current();
    } else {
      stopRef.current();
    }
    return () => {
      stopRef.current();
    };
  }, [isOpen]);
  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    setIsCapturing(true);
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = 320;
    canvas.height = 320;
    const videoWidth = video.videoWidth;
    const videoHeight = video.videoHeight;
    const size = Math.min(videoWidth, videoHeight);
    const offsetX = (videoWidth - size) / 2;
    const offsetY = (videoHeight - size) / 2;
    ctx.drawImage(
      video,
      offsetX,
      offsetY,
      size,
      size,
      // Source rectangle (square crop)
      0,
      0,
      320,
      320
      // Destination rectangle
    );
    canvas.toBlob(
      (blob) => {
        if (blob) {
          onCapture(blob);
          onClose(false);
        }
        setIsCapturing(false);
      },
      "image/jpeg",
      0.8
    );
  };
  const handleClose = () => {
    stopRef.current();
    onClose(false);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Modal, { isOpen, onClose: handleClose, title: "Take Profile Photo", size: "md", showCloseButton: true, children: /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "p-6", children: [
    /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "text-center", children: [
      hasPermission === null && /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "flex flex-col items-center space-y-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("p", { className: "text-gray-600 dark:text-gray-400", children: "Requesting camera access..." })
      ] }),
      hasPermission === false && /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "flex flex-col items-center space-y-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "w-16 h-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Camera, { className: "w-8 h-8 text-red-600 dark:text-red-400" }) }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("h3", { className: "text-lg font-medium text-gray-900 dark:text-white mb-2", children: "Camera Access Required" }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("p", { className: "text-gray-600 dark:text-gray-400 mb-4", children: "Please allow camera access to take a profile photo." }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Button, { onClick: startRef.current, variant: "primary", size: "sm", children: "Try Again" })
        ] })
      ] }),
      hasPermission === true && /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "space-y-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "relative", children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
            "video",
            {
              ref: videoRef,
              autoPlay: true,
              playsInline: true,
              muted: true,
              className: cx(
                "w-80 h-80 object-cover rounded-lg border-4 border-gray-200 dark:border-gray-600",
                "mx-auto block"
              ),
              style: {
                transform: "scaleX(-1)"
                // Mirror the video for selfie mode
              }
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "absolute inset-0 flex items-center justify-center pointer-events-none", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "w-64 h-64 border-2 border-white rounded-full shadow-lg opacity-50" }) }),
          isCapturing && /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "absolute inset-0 bg-white bg-opacity-80 rounded-lg flex items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "text-gray-900 font-medium", children: "Capturing..." }) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("p", { className: "text-sm text-gray-600 dark:text-gray-400", children: 'Position yourself within the circle and click "Take Photo"' }),
        /* @__PURE__ */ (0, import_jsx_runtime8.jsxs)("div", { className: "flex space-x-3 justify-center", children: [
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Button, { onClick: handleClose, variant: "outline", size: "md", disabled: isCapturing, children: "Cancel" }),
          /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(
            Button,
            {
              onClick: capturePhoto,
              variant: "primary",
              size: "md",
              disabled: isCapturing,
              leftIcon: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)(Camera, { className: "w-4 h-4" }),
              children: isCapturing ? "Capturing..." : "Take Photo"
            }
          )
        ] })
      ] })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("canvas", { ref: canvasRef, className: "hidden" })
  ] }) });
}

// frontend/src/views/profiles/components/AvatarAndStats.tsx
var import_jsx_runtime9 = __toESM(require_jsx_runtime(), 1);
function AvatarAndStats() {
  const { loggedInUser } = useProfilesStore();
  const [avatar, setAvatar] = (0, import_react4.useState)(null);
  const [uploadProgress, setUploadProgress] = (0, import_react4.useState)(0);
  const [isUploading, setIsUploading] = (0, import_react4.useState)(false);
  const [isCameraModalOpen, setIsCameraModalOpen] = (0, import_react4.useState)(false);
  (0, import_react4.useEffect)(() => {
    const img = new Image();
    img.onload = () => {
      setAvatar(`/users/${loggedInUser.id}/avatar`);
    };
    img.src = `/users/${loggedInUser.id}/avatar`;
  }, [loggedInUser]);
  const handleCameraCapture = async () => {
    setIsCameraModalOpen(true);
  };
  const handleCameraModalCapture = (blob) => {
    uploadAvatarFile(blob);
  };
  const handleFileUpload = (file) => {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      showError("Please select a valid image file (JPEG, PNG, GIF, or WebP).");
      return;
    }
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      showError("File size must be less than 5MB.");
      return;
    }
    uploadAvatarFile(file);
  };
  const uploadAvatarFile = async (file) => {
    try {
      setIsUploading(true);
      setUploadProgress(0);
      const formData = new FormData();
      formData.append("avatar", file);
      const response = await upload("/profile/avatar", formData, (progress) => {
        setUploadProgress(progress);
      });
      if (response.success) {
        setAvatar(`/users/${loggedInUser.id}/avatar?t=${(/* @__PURE__ */ new Date()).getTime()}`);
        showSuccess("Avatar updated successfully!");
        setUploadProgress(100);
      }
    } catch (error) {
      console.error("Avatar upload failed:", error);
      showError("Failed to upload avatar. Please try again.");
    } finally {
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
      }, 1e3);
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(import_jsx_runtime9.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(CameraModal, { isOpen: isCameraModalOpen, onClose: setIsCameraModalOpen, onCapture: handleCameraModalCapture }),
    /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(Box, { className: "p-6", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "flex flex-col items-stretch md:flex-row gap-5", children: [
      /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "flex-1 flex flex-col sm:flex-row gap-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "relative", children: [
          /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "relative w-32 h-32", children: [
            avatar && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("img", { src: avatar, className: "w-full h-full rounded-full object-cover object-center" }),
            !avatar && /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)(
              "div",
              {
                className: cx(
                  "w-32 h-32 rounded-full border-4 border-gray-200 dark:border-gray-600",
                  "flex items-center justify-center text-3xl font-bold text-white bg-primary"
                ),
                children: [
                  loggedInUser.firstName[0].toUpperCase(),
                  loggedInUser.lastName[0].toUpperCase()
                ]
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(
              AvatarEditDropdown,
              {
                onCameraCapture: handleCameraCapture,
                onFileUpload: handleFileUpload,
                disabled: isUploading
              }
            ),
            isUploading && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "absolute inset-0 bg-black/80 bg-opacity-50 rounded-full flex items-center justify-center", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "text-white text-xs font-medium", children: uploadProgress < 100 ? "Uploading..." : "Complete!" }) })
          ] }),
          isUploading && /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "mt-2 w-32", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(ProgressBar, { progress: uploadProgress, size: "sm", color: "primary", showPercentage: false }) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("h1", { className: "text-3xl font-bold text-gray-900 dark:text-white", children: loggedInUser.name }),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { className: "text-gray-600 dark:text-gray-400", children: loggedInUser.email }),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "flex items-center space-x-2 mt-1", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("p", { className: "text-sm text-gray-500 dark:text-gray-500", children: [
            "Joined ",
            dateToMDY(loggedInUser.joinedAt)
          ] }) }),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "flex items-center gap-2 mt-2", children: [
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)(StatusIndicator, { status: "online", size: "small" }),
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("p", { className: "text-sm text-gray-900 dark:text-white", children: "Online" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "flex-1 md:mt-3", children: /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "bg-gray-50 dark:bg-gray-700 rounded-lg p-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("h3", { className: "text-sm font-medium text-gray-700 dark:text-gray-300 mb-3", children: "Profile Stats" }),
        /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "grid grid-cols-2 gap-6", children: [
          /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "text-center", children: [
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: "12" }),
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "text-xs text-gray-500 dark:text-gray-400", children: "Channels Joined" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime9.jsxs)("div", { className: "text-center", children: [
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "text-2xl font-bold text-gray-900 dark:text-white", children: "247" }),
            /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { className: "text-xs text-gray-500 dark:text-gray-400", children: "Messages Sent" })
          ] })
        ] })
      ] }) })
    ] }) })
  ] });
}

// frontend/src/views/profiles/components/Bio.tsx
var import_react6 = __toESM(require_react(), 1);

// frontend/src/components/Dropdown.tsx
var import_react5 = __toESM(require_react(), 1);
var import_jsx_runtime10 = __toESM(require_jsx_runtime(), 1);
var sizeClasses3 = {
  sm: "px-3 py-2 text-sm",
  md: "px-3 py-3 text-base",
  lg: "px-4 py-4 text-lg"
};
var variantClasses = {
  default: "border border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-900 dark:text-white",
  filled: "border border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white",
  outlined: "border-2 border-gray-300 bg-white dark:border-gray-600 dark:bg-gray-900 dark:text-white"
};
function Dropdown(props) {
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
    value = "",
    disabled = false,
    placeholder,
    options,
    onChange,
    onBlur,
    ...divProps
  } = props;
  const selectId = (0, import_react5.useMemo)(() => id || `dropdown-${Math.random().toString(36).substring(2, 9)}`, [id]);
  const baseClasses = cx(
    "rounded-lg transition-colors duration-200 outline-none",
    "focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
    sizeClasses3[size],
    variantClasses[variant],
    error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "",
    disabled ? "opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-800" : "cursor-pointer",
    fullWidth ? "w-full" : "",
    "appearance-none bg-no-repeat bg-right pr-10",
    icon && iconPosition === "left" ? "pl-10" : "",
    icon && iconPosition === "right" ? "pr-16" : ""
  );
  const containerClasses = cx("relative", fullWidth ? "w-full" : "inline-block", className);
  const handleSelectChange = (e) => {
    if (onChange && !disabled) {
      onChange(e.target.value);
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { ...divProps, className: containerClasses, children: [
    label && /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("label", { htmlFor: selectId, className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: [
      label,
      required && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { className: "text-red-500 ml-1", children: "*" })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "relative", children: [
      icon && iconPosition === "left" && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: "absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400", children: icon }),
      /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(
        "select",
        {
          id: selectId,
          value: value || "",
          disabled,
          onChange: handleSelectChange,
          onBlur,
          className: baseClasses,
          style: {
            backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
            backgroundPosition: "right 0.5rem center",
            backgroundSize: "1.5em 1.5em"
          },
          children: [
            placeholder && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("option", { value: "", disabled: true, children: placeholder }),
            options.map((option) => /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("option", { value: option.value, disabled: option.disabled, children: option.label }, option.value))
          ]
        }
      ),
      icon && iconPosition === "right" && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: "absolute inset-y-0 right-8 pl-3 flex items-center pointer-events-none text-gray-400", children: icon })
    ] }),
    (error || helperText) && /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "mt-2", children: [
      error && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { className: "text-sm text-red-600 dark:text-red-400", children: error }),
      helperText && !error && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: helperText })
    ] })
  ] });
}

// frontend/src/utils/timezones.ts
var TIMEZONE_OPTIONS = [
  // UTC
  { value: "UTC", label: "(UTC+00:00) Coordinated Universal Time" },
  // Africa
  { value: "Africa/Abidjan", label: "(UTC+00:00) Abidjan" },
  { value: "Africa/Accra", label: "(UTC+00:00) Accra" },
  { value: "Africa/Addis_Ababa", label: "(UTC+03:00) Addis Ababa" },
  { value: "Africa/Algiers", label: "(UTC+01:00) Algiers" },
  { value: "Africa/Cairo", label: "(UTC+02:00) Cairo" },
  { value: "Africa/Casablanca", label: "(UTC+01:00) Casablanca" },
  { value: "Africa/Johannesburg", label: "(UTC+02:00) Johannesburg" },
  { value: "Africa/Lagos", label: "(UTC+01:00) Lagos" },
  { value: "Africa/Nairobi", label: "(UTC+03:00) Nairobi" },
  // America - North America
  { value: "America/New_York", label: "(UTC-05:00) New York (Eastern Time)" },
  { value: "America/Chicago", label: "(UTC-06:00) Chicago (Central Time)" },
  { value: "America/Denver", label: "(UTC-07:00) Denver (Mountain Time)" },
  { value: "America/Los_Angeles", label: "(UTC-08:00) Los Angeles (Pacific Time)" },
  { value: "America/Anchorage", label: "(UTC-09:00) Anchorage (Alaska Time)" },
  { value: "America/Adak", label: "(UTC-10:00) Adak (Hawaii-Aleutian Time)" },
  { value: "Pacific/Honolulu", label: "(UTC-10:00) Honolulu (Hawaii Time)" },
  // America - Canada
  { value: "America/Toronto", label: "(UTC-05:00) Toronto (Eastern Time)" },
  { value: "America/Winnipeg", label: "(UTC-06:00) Winnipeg (Central Time)" },
  { value: "America/Edmonton", label: "(UTC-07:00) Edmonton (Mountain Time)" },
  { value: "America/Vancouver", label: "(UTC-08:00) Vancouver (Pacific Time)" },
  { value: "America/Halifax", label: "(UTC-04:00) Halifax (Atlantic Time)" },
  { value: "America/St_Johns", label: "(UTC-03:30) St. Johns (Newfoundland Time)" },
  // America - Mexico
  { value: "America/Mexico_City", label: "(UTC-06:00) Mexico City" },
  { value: "America/Cancun", label: "(UTC-05:00) Cancun" },
  { value: "America/Tijuana", label: "(UTC-08:00) Tijuana" },
  // America - Central/South America
  { value: "America/Guatemala", label: "(UTC-06:00) Guatemala" },
  { value: "America/Costa_Rica", label: "(UTC-06:00) Costa Rica" },
  { value: "America/Panama", label: "(UTC-05:00) Panama" },
  { value: "America/Bogota", label: "(UTC-05:00) Bogot\xE1" },
  { value: "America/Lima", label: "(UTC-05:00) Lima" },
  { value: "America/Caracas", label: "(UTC-04:00) Caracas" },
  { value: "America/Guyana", label: "(UTC-04:00) Georgetown" },
  { value: "America/La_Paz", label: "(UTC-04:00) La Paz" },
  { value: "America/Santiago", label: "(UTC-03:00) Santiago" },
  { value: "America/Argentina/Buenos_Aires", label: "(UTC-03:00) Buenos Aires" },
  { value: "America/Montevideo", label: "(UTC-03:00) Montevideo" },
  { value: "America/Sao_Paulo", label: "(UTC-03:00) S\xE3o Paulo" },
  { value: "America/Fortaleza", label: "(UTC-03:00) Fortaleza" },
  { value: "America/Manaus", label: "(UTC-04:00) Manaus" },
  // Asia - East Asia
  { value: "Asia/Tokyo", label: "(UTC+09:00) Tokyo" },
  { value: "Asia/Seoul", label: "(UTC+09:00) Seoul" },
  { value: "Asia/Shanghai", label: "(UTC+08:00) Shanghai" },
  { value: "Asia/Hong_Kong", label: "(UTC+08:00) Hong Kong" },
  { value: "Asia/Taipei", label: "(UTC+08:00) Taipei" },
  { value: "Asia/Singapore", label: "(UTC+08:00) Singapore" },
  { value: "Asia/Kuala_Lumpur", label: "(UTC+08:00) Kuala Lumpur" },
  { value: "Asia/Jakarta", label: "(UTC+07:00) Jakarta" },
  { value: "Asia/Bangkok", label: "(UTC+07:00) Bangkok" },
  { value: "Asia/Ho_Chi_Minh", label: "(UTC+07:00) Ho Chi Minh City" },
  { value: "Asia/Manila", label: "(UTC+08:00) Manila" },
  // Asia - South Asia
  { value: "Asia/Kolkata", label: "(UTC+05:30) Kolkata (India)" },
  { value: "Asia/Colombo", label: "(UTC+05:30) Colombo" },
  { value: "Asia/Dhaka", label: "(UTC+06:00) Dhaka" },
  { value: "Asia/Kathmandu", label: "(UTC+05:45) Kathmandu" },
  { value: "Asia/Karachi", label: "(UTC+05:00) Karachi" },
  // Asia - Central/West Asia
  { value: "Asia/Dubai", label: "(UTC+04:00) Dubai" },
  { value: "Asia/Qatar", label: "(UTC+03:00) Doha" },
  { value: "Asia/Kuwait", label: "(UTC+03:00) Kuwait" },
  { value: "Asia/Riyadh", label: "(UTC+03:00) Riyadh" },
  { value: "Asia/Baghdad", label: "(UTC+03:00) Baghdad" },
  { value: "Asia/Tehran", label: "(UTC+03:30) Tehran" },
  { value: "Asia/Kabul", label: "(UTC+04:30) Kabul" },
  { value: "Asia/Tashkent", label: "(UTC+05:00) Tashkent" },
  { value: "Asia/Almaty", label: "(UTC+06:00) Almaty" },
  // Europe
  { value: "Europe/London", label: "(UTC+00:00) London (GMT)" },
  { value: "Europe/Dublin", label: "(UTC+00:00) Dublin" },
  { value: "Europe/Lisbon", label: "(UTC+00:00) Lisbon" },
  { value: "Europe/Madrid", label: "(UTC+01:00) Madrid" },
  { value: "Europe/Paris", label: "(UTC+01:00) Paris" },
  { value: "Europe/Brussels", label: "(UTC+01:00) Brussels" },
  { value: "Europe/Amsterdam", label: "(UTC+01:00) Amsterdam" },
  { value: "Europe/Berlin", label: "(UTC+01:00) Berlin" },
  { value: "Europe/Zurich", label: "(UTC+01:00) Zurich" },
  { value: "Europe/Rome", label: "(UTC+01:00) Rome" },
  { value: "Europe/Vienna", label: "(UTC+01:00) Vienna" },
  { value: "Europe/Prague", label: "(UTC+01:00) Prague" },
  { value: "Europe/Warsaw", label: "(UTC+01:00) Warsaw" },
  { value: "Europe/Budapest", label: "(UTC+01:00) Budapest" },
  { value: "Europe/Stockholm", label: "(UTC+01:00) Stockholm" },
  { value: "Europe/Oslo", label: "(UTC+01:00) Oslo" },
  { value: "Europe/Copenhagen", label: "(UTC+01:00) Copenhagen" },
  { value: "Europe/Helsinki", label: "(UTC+02:00) Helsinki" },
  { value: "Europe/Athens", label: "(UTC+02:00) Athens" },
  { value: "Europe/Istanbul", label: "(UTC+03:00) Istanbul" },
  { value: "Europe/Kiev", label: "(UTC+02:00) Kiev" },
  { value: "Europe/Moscow", label: "(UTC+03:00) Moscow" },
  // Australia/Oceania
  { value: "Australia/Sydney", label: "(UTC+10:00) Sydney (AEST)" },
  { value: "Australia/Melbourne", label: "(UTC+10:00) Melbourne" },
  { value: "Australia/Brisbane", label: "(UTC+10:00) Brisbane" },
  { value: "Australia/Perth", label: "(UTC+08:00) Perth" },
  { value: "Australia/Adelaide", label: "(UTC+09:30) Adelaide" },
  { value: "Australia/Darwin", label: "(UTC+09:30) Darwin" },
  { value: "Australia/Hobart", label: "(UTC+10:00) Hobart" },
  { value: "Pacific/Auckland", label: "(UTC+12:00) Auckland" },
  { value: "Pacific/Fiji", label: "(UTC+12:00) Fiji" },
  { value: "Pacific/Guam", label: "(UTC+10:00) Guam" },
  // Pacific Islands
  { value: "Pacific/Tahiti", label: "(UTC-10:00) Tahiti" },
  { value: "Pacific/Marquesas", label: "(UTC-09:30) Marquesas" },
  { value: "Pacific/Gambier", label: "(UTC-09:00) Gambier" },
  { value: "Pacific/Pitcairn", label: "(UTC-08:00) Pitcairn" },
  { value: "Pacific/Easter", label: "(UTC-06:00) Easter Island" },
  { value: "Pacific/Galapagos", label: "(UTC-06:00) Gal\xE1pagos" }
].sort((a, b) => {
  const getOffset = (label) => {
    const match = label.match(/UTC([+-]\d{2}:\d{2})/);
    if (!match) return 0;
    const [, offset] = match;
    const [hours, minutes] = offset.split(":");
    return parseInt(hours) * 60 + parseInt(minutes) * (hours.startsWith("-") ? -1 : 1);
  };
  return getOffset(a.label) - getOffset(b.label);
});

// frontend/src/views/profiles/components/Bio.tsx
var import_jsx_runtime11 = __toESM(require_jsx_runtime(), 1);
function validateField(field, value) {
  if (!value || value.trim() === "") {
    return `${field === "firstName" ? "First name" : "Last name"} is required`;
  }
  return void 0;
}
function formReducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      if (action.field === "firstName" || action.field === "lastName") {
        const error = validateField(action.field, action.value);
        return {
          ...state,
          [action.field]: action.value,
          errors: {
            ...state.errors,
            [action.field]: error
          }
        };
      }
      return {
        ...state,
        [action.field]: action.value
      };
    case "RESET":
      return initFormData(action.value);
    default:
      return state;
  }
}
function Bio() {
  const [isSaving, setIsSaving] = (0, import_react6.useState)(false);
  const { loggedInUser, setLoggedInUser } = useProfilesStore();
  const [state, dispatch] = (0, import_react6.useReducer)(formReducer, initFormData(loggedInUser));
  const changed = `${state.firstName}${state.lastName}${state.role ?? ""}${state.department || ""}${state.timezone}` !== state.origin;
  const handleFieldChange = (field) => (e) => {
    dispatch({ type: "SET_FIELD", field, value: e.target.value });
  };
  const handleReset = () => dispatch({ type: "RESET", value: loggedInUser });
  const handleSave = async () => {
    if (state.errors.firstName || state.errors.lastName || isSaving) {
      return;
    }
    setIsSaving(true);
    const response = await put("/profile", {
      user: {
        first_name: state.firstName,
        last_name: state.lastName,
        role: state.role,
        department: state.department,
        time_zone: state.timezone
      }
    });
    setIsSaving(false);
    if (response.success) {
      const user = transformUser(response.data);
      dispatch({ type: "RESET", value: user });
      setLoggedInUser(user);
      showSuccess("Profile updated successfully");
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)(Box, { className: "flex-1 p-6", children: [
    /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("h2", { className: "text-lg font-semibold text-gray-900 dark:text-white mb-6", children: "Personal Information" }),
    /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "space-y-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
        TextBox,
        {
          label: "First name",
          value: state.firstName,
          onChange: handleFieldChange("firstName"),
          error: state.errors.firstName,
          required: true,
          disabled: isSaving
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
        TextBox,
        {
          label: "Last name",
          value: state.lastName,
          onChange: handleFieldChange("lastName"),
          error: state.errors.lastName,
          disabled: isSaving,
          required: true
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(TextBox, { label: "Email", value: state.email, required: true, disabled: true }),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(TextBox, { label: "Role", value: state.role, onChange: handleFieldChange("role"), disabled: isSaving }),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
        TextBox,
        {
          label: "Department",
          value: state.department,
          onChange: handleFieldChange("department"),
          disabled: isSaving
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
        Dropdown,
        {
          label: "Timezone",
          value: state.timezone,
          required: true,
          onChange: (value) => dispatch({ type: "SET_FIELD", field: "timezone", value }),
          options: TIMEZONE_OPTIONS,
          disabled: isSaving
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime11.jsxs)("div", { className: "flex items-center gap-4 mt-6", children: [
        /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
          Button,
          {
            variant: "primary",
            className: "w-20",
            disabled: !changed || isSaving,
            onClick: handleSave,
            loading: isSaving,
            children: "Save"
          }
        ),
        changed && /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(Button, { variant: "outline", className: "w-20", disabled: isSaving, loading: isSaving, onClick: handleReset, children: "Cancel" })
      ] })
    ] })
  ] });
}
function initFormData(user) {
  console.log("initFormData", user);
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role || "",
    department: user.department || "",
    origin: `${user.firstName}${user.lastName}${user.role ?? ""}${user.department || ""}${user.timezone}`,
    timezone: user.timezone,
    errors: {}
  };
}

// frontend/src/views/profiles/components/Status.tsx
var import_jsx_runtime12 = __toESM(require_jsx_runtime(), 1);
function Status() {
  const handleStatusChange = (status) => {
    put("/profile", { status });
  };
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(Box, { className: "flex-1 p-6", children: [
    /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("h2", { className: "text-lg font-semibold text-gray-900 dark:text-white mb-6", children: "Status" }),
    /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "space-y-4", children: [
      /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(
        "div",
        {
          className: "cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700",
          role: "menuitem",
          onClick: () => {
            handleStatusChange("online");
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(StatusIndicator, { status: "online", size: "small" }),
              /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("p", { className: "text-sm text-gray-900 dark:text-white", children: "Online" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("p", { className: "text-xs text-gray-500 dark:text-gray-400", children: "Available to chat" })
          ]
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)(
        "div",
        {
          className: "cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700",
          role: "menuitem",
          onClick: () => {
            handleStatusChange("online");
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(StatusIndicator, { status: "offline", size: "small" }),
              /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("p", { className: "text-sm text-gray-900 dark:text-white", children: "Offline" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("p", { className: "text-xs text-gray-500 dark:text-gray-400", children: "Available to chat" })
          ]
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "bg-gray-50 dark:bg-gray-700 rounded-lg p-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("h3", { className: "text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Current Status" }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "flex items-center space-x-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { className: "flex items-center space-x-2", children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { className: "w-3 h-3 rounded-full bg-green-500 border-2 border-white dark:border-gray-800" }) }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("p", { className: "text-sm font-medium text-gray-900 dark:text-white", children: "Online" }) })
        ] })
      ] })
    ] })
  ] });
}

// frontend/src/views/profiles/index.tsx
var import_jsx_runtime13 = __toESM(require_jsx_runtime(), 1);
function Profiles() {
  const handleLogout = async () => {
    await del("/signout");
    window.location.href = "/signin";
  };
  return /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "page-container", children: [
    /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
      Header,
      {
        pageTitle: "Profile",
        onBack: () => {
          window.location.href = "/home";
        },
        children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(IconButton, { icon: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(LogOut, { className: "h-6 w-6" }), onClick: handleLogout })
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8", children: [
      /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(AvatarAndStats, {}),
      /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)("div", { className: "mt-6 flex md:flex-row flex-col gap-6", children: [
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(Bio, {}),
        /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(Status, {})
      ] })
    ] })
  ] });
}
(0, import_client.createRoot)(document.getElementById("root")).render(
  /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(import_react7.StrictMode, { children: /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(ProfilesStoreProvider, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(Profiles, {}),
    /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(ToastContainer, {})
  ] }) })
);
export {
  Profiles
};
