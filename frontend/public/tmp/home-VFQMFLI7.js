import {
  ChevronDown,
  ChevronLeft,
  ClosedLock,
  NewMessageBadge,
  Plus,
  UserAvatar,
  consumer,
  useDirectChannels,
  useDirectChannelsSocket,
  useGroupChannels,
  useGroupChannelsSocket
} from "./common-UQU3S53T.js";
import {
  Box,
  Header,
  LogOut,
  MenuItem,
  Modal,
  useClickOutside
} from "./common-2TH5UJUQ.js";
import {
  Spinner,
  del,
  get,
  getPredefinedData,
  post,
  put,
  transformUser,
  transformUsers
} from "./common-4QKMN733.js";
import {
  Checkbox
} from "./common-ZYHBS7DU.js";
import {
  TextBox,
  ToastContainer,
  showError,
  showSuccess
} from "./common-QR3E4ZNU.js";
import {
  Button,
  __toESM,
  cx,
  require_client,
  require_jsx_runtime,
  require_react,
  validateChannelName
} from "./common-ZKMN625A.js";

// src/views/home/index.tsx
var import_react9 = __toESM(require_react(), 1);
var import_client = __toESM(require_client(), 1);

// src/svgs/Message.tsx
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
function Message(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", ...props, children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "path",
    {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
    }
  ) });
}

// src/views/home/components/UserMenu.tsx
var import_react4 = __toESM(require_react(), 1);

// src/views/home/store.tsx
var import_react3 = __toESM(require_react(), 1);

// src/hooks/useUserChannelsSocket.ts
var import_react = __toESM(require_react(), 1);
function useUserChannelsSocket(receiveUser) {
  const receiveRef = (0, import_react.useRef)(() => {
  });
  receiveRef.current = (user) => {
    receiveUser(user);
  };
  (0, import_react.useEffect)(() => {
    const channel = consumer.subscriptions.create(
      { channel: "UsersChannel" },
      {
        connected: () => {
          if (true) {
            console.log("Connected to useUserChannelsSocket");
          }
        },
        disconnected: () => {
          if (true) {
            console.log("Disconnected from useUserChannelsSocket");
          }
        },
        received: (data) => {
          receiveRef.current(transformUser(data.user));
        }
      }
    );
    return () => {
      channel.unsubscribe();
    };
  }, []);
}

// src/hooks/useUsers.ts
var import_react2 = __toESM(require_react(), 1);
function useUsers() {
  const [users, setUsers] = (0, import_react2.useState)([]);
  const [loading, setLoading] = (0, import_react2.useState)(true);
  (0, import_react2.useEffect)(() => {
    (async () => {
      const response = await get("/users");
      if (response.success) {
        setUsers(transformUsers(response.data));
      }
      setLoading(false);
    })();
  }, []);
  return {
    setUsers,
    users,
    usersLoading: loading
  };
}

// src/views/home/store.tsx
var import_jsx_runtime2 = __toESM(require_jsx_runtime(), 1);
var userResponse = getPredefinedData("logged-in-user");
if (!userResponse) {
  throw new Error("User data not found. Ensure the user data is embedded in the HTML.");
}
var HomeStoreContext = (0, import_react3.createContext)({
  groupChannels: [],
  groupChannelsLoading: true,
  directChannels: [],
  directChannelsLoading: true,
  users: [],
  usersLoading: true,
  loggedInUser: transformUser(userResponse)
});
function HomeStoreProvider({ children }) {
  const [loggedInUser] = (0, import_react3.useState)(transformUser(userResponse));
  const { groupChannelsLoading, groupChannels, setGroupChannels } = useGroupChannels();
  const { directChannelsLoading, directChannels, setDirectChannels } = useDirectChannels();
  const { usersLoading, users, setUsers } = useUsers();
  const extendedDirectChannels = (0, import_react3.useMemo)(() => {
    return directChannels.map((channel) => ({
      ...channel,
      partner: channel.participants.find((user) => user.id !== loggedInUser.id)
    }));
  }, [directChannels, loggedInUser.id]);
  useGroupChannelsSocket((groupChannel) => {
    setGroupChannels((prev) => {
      const existingChannel = prev.find((c) => c.id === groupChannel.id);
      if (existingChannel) {
        return prev.map((c) => c.id === groupChannel.id ? { ...c, ...groupChannel } : c);
      }
      return [...prev, groupChannel];
    });
  });
  useDirectChannelsSocket((directChannel) => {
    setDirectChannels((prev) => {
      const existingChannel = prev.find((c) => c.id === directChannel.id);
      if (existingChannel) {
        return prev.map((c) => c.id === directChannel.id ? { ...c, ...directChannel } : c);
      }
      return [...prev, directChannel];
    });
  });
  useUserChannelsSocket((user) => {
    setUsers((prev) => {
      const existingUser = prev.find((u) => u.id === user.id);
      if (existingUser) {
        return prev.map((u) => u.id === user.id ? { ...u, ...user } : u);
      }
      return [...prev, user];
    });
  });
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    HomeStoreContext.Provider,
    {
      value: {
        groupChannels,
        groupChannelsLoading,
        directChannels: extendedDirectChannels,
        directChannelsLoading,
        users,
        usersLoading,
        loggedInUser
      },
      children
    }
  );
}
function useHomeStore() {
  const context = (0, import_react3.useContext)(HomeStoreContext);
  if (!context) {
    throw new Error("useHomeStore must be used within a HomeStoreProvider");
  }
  return context;
}

// src/svgs/ChevronUp.tsx
var import_jsx_runtime3 = __toESM(require_jsx_runtime(), 1);
function ChevronUp(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", ...props, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: "2", d: "M5 15l7-7 7 7" }) });
}

// src/svgs/Settings.tsx
var import_jsx_runtime4 = __toESM(require_jsx_runtime(), 1);
function Settings(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", ...props, children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      "path",
      {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
        d: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M15 12a3 3 0 11-6 0 3 3 0 016 0z" })
  ] });
}

// src/svgs/User.tsx
var import_jsx_runtime5 = __toESM(require_jsx_runtime(), 1);
function User(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", ...props, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
    "path",
    {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    }
  ) });
}

// src/views/home/components/UserMenu.tsx
var import_jsx_runtime6 = __toESM(require_jsx_runtime(), 1);
function UserMenu() {
  const { loggedInUser } = useHomeStore();
  const [isOpen, setIsOpen] = (0, import_react4.useState)(false);
  const ref = useClickOutside(() => {
    setIsOpen(false);
  });
  const handleLogout = async () => {
    setIsOpen(false);
    await del("/signout");
    window.location.href = "/signin";
  };
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "relative", children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
      "button",
      {
        onClick: () => setIsOpen(!isOpen),
        className: "flex items-center space-x-3 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg p-2 transition-colors duration-200",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(UserAvatar, { user: loggedInUser }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { className: "hidden md:block text-sm font-medium text-gray-700 dark:text-gray-300", children: loggedInUser.name }),
          isOpen ? /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(ChevronUp, { className: "h-4 w-4 text-gray-500 dark:text-gray-400" }) : /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(ChevronDown, { className: "h-4 w-4 text-gray-500 dark:text-gray-400" })
        ]
      }
    ),
    isOpen && /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)(
      "div",
      {
        ref,
        className: "absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1 z-50",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
            MenuItem,
            {
              onClick: () => {
                setIsOpen(false);
                window.location.href = "/profile";
              },
              className: "text-gray-700 dark:text-gray-300",
              iconRNode: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(User, { className: "h-4 w-4" }),
              labelRNode: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { children: "Update Profile" })
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
            MenuItem,
            {
              onClick: () => {
                setIsOpen(false);
                alert("Settings clicked");
              },
              className: "text-gray-700 dark:text-gray-300",
              iconRNode: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(Settings, { className: "h-4 w-4" }),
              labelRNode: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { children: "Settings" })
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("hr", { className: "my-1 border-gray-200 dark:border-gray-600" }),
          /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
            MenuItem,
            {
              onClick: handleLogout,
              className: "text-red-600 dark:text-red-400",
              iconRNode: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(LogOut, { className: "h-4 w-4" }),
              labelRNode: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("span", { children: "Logout" })
            }
          )
        ]
      }
    )
  ] });
}

// src/views/home/components/HomeHeader.tsx
var import_jsx_runtime7 = __toESM(require_jsx_runtime(), 1);
function HomeHeader() {
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Header, { pageTitle: "Home", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { className: "flex items-center space-x-4", children: [
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("div", { className: "hidden md:block", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
      TextBox,
      {
        name: "search",
        placeholder: "Search users, channels...",
        className: "w-80",
        icon: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(ChevronLeft, { className: "h-5 w-5 text-gray-400" })
      }
    ) }),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
      Button,
      {
        variant: "primary",
        size: "sm",
        onClick: () => window.location.href = "/conversations",
        leftIcon: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(Message, { className: "w-4 h-4" }),
        children: "Open Chat"
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(UserMenu, {})
  ] }) });
}

// src/views/home/components/GroupChannels.tsx
var import_react8 = __toESM(require_react(), 1);

// src/svgs/Member.tsx
var import_jsx_runtime8 = __toESM(require_jsx_runtime(), 1);
function Member(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("svg", { fill: "currentColor", viewBox: "0 0 20 20", ...props, children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("path", { fillRule: "evenodd", d: "M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z", clipRule: "evenodd" }) });
}

// src/svgs/Team.tsx
var import_jsx_runtime9 = __toESM(require_jsx_runtime(), 1);
function Team(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("svg", { fill: "currentColor", viewBox: "0 0 20 20", ...props, children: /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("path", { d: "M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" }) });
}

// src/views/home/components/EditChannelModal.tsx
var import_react5 = __toESM(require_react(), 1);
var import_jsx_runtime10 = __toESM(require_jsx_runtime(), 1);
function EditChannelModal({ isOpen, onClose, channel }) {
  const [name, setName] = (0, import_react5.useState)(channel?.name || "");
  const [nameError, setNameError] = (0, import_react5.useState)("");
  const [description, setDescription] = (0, import_react5.useState)(channel?.description || "");
  const [isPrivate, setIsPrivate] = (0, import_react5.useState)(channel?.isPrivate || false);
  const [isSubmitting, setIsSubmitting] = (0, import_react5.useState)(false);
  const isEditMode = Boolean(channel);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = validateChannelName(name);
    if (error) {
      setNameError(error);
      return;
    } else {
      setNameError("");
    }
    setIsSubmitting(true);
    if (await submitData({ ...channel, name, description, isGroup: !isPrivate })) {
      showSuccess(`Channel ${isEditMode ? "updated" : "created"} successfully!`);
      onClose(false);
    }
    setIsSubmitting(false);
  };
  const handleClose = () => {
    if (!isSubmitting) {
      setName("");
      setDescription("");
      setIsPrivate(false);
      onClose(false);
    }
  };
  const footer = /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "flex items-center justify-end space-x-3", children: [
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Button, { variant: "ghost", size: "sm", onClick: handleClose, disabled: isSubmitting, children: "Cancel" }),
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
      Button,
      {
        variant: "primary",
        size: "sm",
        type: "submit",
        onClick: handleSubmit,
        disabled: !name.trim() || isSubmitting,
        leftIcon: isSubmitting ? /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Spinner, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(Plus, { className: "h-4 w-4" }),
        children: isSubmitting ? "Creating..." : "Create Channel"
      }
    )
  ] });
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
    Modal,
    {
      isOpen,
      onClose: handleClose,
      title: isEditMode ? "Edit channel" : "Create a channel",
      footer,
      size: "md",
      closeOnBackdropClick: !isSubmitting,
      showCloseButton: !isSubmitting,
      children: /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("form", { onSubmit: handleSubmit, className: "space-y-5", children: [
        /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("label", { htmlFor: "channel-name", className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: [
            "Channel name ",
            /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { className: "text-red-500", children: "*" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
            TextBox,
            {
              error: nameError,
              id: "channel-name",
              name: "name",
              value: name,
              onChange: (e) => {
                setNameError("");
                setName(e.target.value);
              },
              placeholder: "e.g. marketing, design-team",
              disabled: isSubmitting,
              maxLength: 30,
              required: true,
              icon: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("span", { className: "text-gray-400 text-sm", children: "#" })
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { className: "mt-1 text-xs text-gray-500 dark:text-gray-400", children: "Channel names must be lowercase, without spaces or periods, and shorter than 30 characters." })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
            "label",
            {
              htmlFor: "channel-description",
              className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2",
              children: "Description (optional)"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
            "textarea",
            {
              id: "channel-description",
              name: "description",
              value: description,
              onChange: (e) => setDescription(e.target.value),
              placeholder: "What's this channel about?",
              disabled: isSubmitting,
              rows: 3,
              className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200 resize-none"
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
          Checkbox,
          {
            id: "is-private",
            name: "isPrivate",
            checked: isPrivate,
            onChange: (e) => setIsPrivate(e.target.checked),
            disabled: isSubmitting,
            children: /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
                "label",
                {
                  htmlFor: "is-private",
                  className: "text-sm font-medium text-gray-700 dark:text-gray-300 cursor-pointer",
                  children: "Make private"
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("p", { className: "text-xs text-gray-500 dark:text-gray-400 mt-1", children: "Only invited members can see and join private channels." })
            ] })
          }
        ) })
      ] })
    }
  );
}
async function submitData(data) {
  const method = data.id ? put : post;
  const response = await method("/conversations", data);
  return response.success;
}

// src/views/JoinChannelModal.tsx
var import_react6 = __toESM(require_react(), 1);

// src/svgs/TriangleExclamation.tsx
var import_jsx_runtime11 = __toESM(require_jsx_runtime(), 1);
function TriangleExclamation(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime11.jsx)("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", ...props, children: /* @__PURE__ */ (0, import_jsx_runtime11.jsx)(
    "path",
    {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
    }
  ) });
}

// src/views/JoinChannelModal.tsx
var import_jsx_runtime12 = __toESM(require_jsx_runtime(), 1);
function JoinChannelModal({ isOpen, onClose, channel }) {
  const [message, setMessage] = (0, import_react6.useState)("");
  const [isSubmitting, setIsSubmitting] = (0, import_react6.useState)(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!channel) return;
    setIsSubmitting(true);
    try {
      const response = await post(`/conversations/${channel.id}/join_or_request`, { message });
      if (!response.success) {
        showError(response.error || "Failed to join or request channel");
      } else {
        showSuccess(response.data.message || "Request sent successfully!");
      }
      onClose(false);
      setMessage("");
    } catch (error) {
      console.error("Failed to request channel join:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleClose = () => {
    onClose(false);
    setMessage("");
  };
  if (!channel) return null;
  const isPrivateChannel = !channel.isPublic;
  return /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
    Modal,
    {
      isOpen,
      onClose: handleClose,
      title: `${isPrivateChannel ? "Request to Join" : "Join"} #${channel.name}`,
      size: "md",
      footer: /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "flex justify-end gap-3", children: [
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(Button, { variant: "outline", onClick: handleClose, disabled: isSubmitting, children: "Cancel" }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
          Button,
          {
            variant: "primary",
            onClick: handleSubmit,
            disabled: isSubmitting,
            leftIcon: isSubmitting ? /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(Spinner, { className: "h-4 w-4" }) : /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(Plus, { className: "h-4 w-4" }),
            children: isSubmitting ? "Sending..." : isPrivateChannel ? "Send Request" : "Join Channel"
          }
        )
      ] }),
      children: /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "space-y-4", children: [
        /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "bg-gray-50 dark:bg-gray-700 rounded-lg p-4", children: [
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { className: "flex items-center gap-3", children: /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "flex items-center gap-2", children: [
            !isPrivateChannel && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("span", { className: "text-gray-500 dark:text-gray-400 text-lg", children: "#" }),
            isPrivateChannel && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { className: "flex items-center", children: /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(ClosedLock, { className: "h-5 w-5 text-gray-500 dark:text-gray-400" }) }),
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("h3", { className: "font-semibold text-gray-900 dark:text-white", children: channel.name })
          ] }) }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "mt-2 flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300", children: [
            /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(Team, { className: "h-4 w-4" }),
              /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("span", { children: [
                channel.memberCount,
                " members"
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
              "span",
              {
                className: `inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${isPrivateChannel ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"}`,
                children: isPrivateChannel ? "Private" : "Public"
              }
            )
          ] }),
          channel.description && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("p", { className: "mt-2 text-sm text-gray-600 dark:text-gray-300", children: channel.description })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { className: "text-sm text-gray-600 dark:text-gray-300", children: isPrivateChannel ? /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("p", { children: "This is a private channel. Your request will be sent to the channel administrators for approval. You can include an optional message explaining why you'd like to join." }) : /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("p", { children: "This is a public channel. You'll be able to view and participate in conversations immediately after joining." }) }),
        isPrivateChannel && /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { children: [
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("label", { htmlFor: "join-message", className: "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2", children: "Message (Optional)" }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(
            "textarea",
            {
              id: "join-message",
              name: "join-message",
              placeholder: "Hi! I'd like to join this channel because...",
              value: message,
              onChange: (e) => setMessage(e.target.value),
              rows: 3,
              maxLength: 500,
              className: "w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-colors duration-200 resize-none"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "mt-1 text-xs text-gray-500 dark:text-gray-400 text-right", children: [
            message.length,
            "/500 characters"
          ] })
        ] }),
        isPrivateChannel && /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("div", { className: "bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-3", children: /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "flex items-start space-x-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime12.jsx)(TriangleExclamation, { className: "h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" }),
          /* @__PURE__ */ (0, import_jsx_runtime12.jsxs)("div", { className: "text-sm text-amber-700 dark:text-amber-300", children: [
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("p", { className: "font-medium", children: "Request Pending" }),
            /* @__PURE__ */ (0, import_jsx_runtime12.jsx)("p", { children: "Once you send your request, you'll need to wait for approval from a channel administrator." })
          ] })
        ] }) })
      ] })
    }
  );
}

// src/components/ShowMoreOrLess.tsx
var import_react7 = __toESM(require_react(), 1);
var import_jsx_runtime13 = __toESM(require_jsx_runtime(), 1);
function ShowMoreOrLess({
  defaultItemCount = 8,
  items,
  renderItem
}) {
  const [showAllItems, setShowAllItems] = (0, import_react7.useState)(false);
  return /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(import_jsx_runtime13.Fragment, { children: [
    (showAllItems ? items : items.slice(0, defaultItemCount)).map((item, index) => renderItem(item, index)),
    items.length > defaultItemCount && /* @__PURE__ */ (0, import_jsx_runtime13.jsx)("div", { className: "px-3 py-2", children: /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(
      "button",
      {
        onClick: () => setShowAllItems(!showAllItems),
        className: cx(
          "w-full text-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium",
          "py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200",
          "flex items-center justify-center gap-1"
        ),
        children: showAllItems ? /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(import_jsx_runtime13.Fragment, { children: [
          "Show less",
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(ChevronUp, { className: "w-4 h-4" })
        ] }) : /* @__PURE__ */ (0, import_jsx_runtime13.jsxs)(import_jsx_runtime13.Fragment, { children: [
          "See ",
          items.length - defaultItemCount,
          " more items",
          /* @__PURE__ */ (0, import_jsx_runtime13.jsx)(ChevronDown, { className: "w-4 h-4" })
        ] })
      }
    ) })
  ] });
}

// src/views/home/components/GroupChannels.tsx
var import_jsx_runtime14 = __toESM(require_jsx_runtime(), 1);
function GroupChannels() {
  const [showEditChannelModal, setShowEditChannelModal] = (0, import_react8.useState)(false);
  const [joinOrRequestChannel, setJoinOrRequestChannel] = (0, import_react8.useState)(null);
  const { groupChannels, groupChannelsLoading } = useHomeStore();
  const handleJoinOrRequest = (channel) => {
    setJoinOrRequestChannel(channel);
  };
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "lg:col-span-1", children: [
    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "md:hidden mb-6", children: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
      TextBox,
      {
        name: "search-mobile",
        placeholder: "Search users, channels...",
        icon: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(ChevronLeft, { className: "h-5 w-5 text-gray-400" })
      }
    ) }),
    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
      Box,
      {
        headerRNode: /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(import_jsx_runtime14.Fragment, { children: [
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("h2", { className: "text-lg font-semibold text-gray-900 dark:text-white", children: "Channels" }),
          /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: () => setShowEditChannelModal(true),
              leftIcon: /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Plus, { className: "h-4 w-4" }),
              children: "New Channel"
            }
          )
        ] }),
        children: /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "p-2", children: [
          groupChannelsLoading && /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "min-h-48 flex items-center justify-center gap-2 dark:text-gray-400", children: [
            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Spinner, { className: "w-5 h-5" }),
            " Loading channels..."
          ] }),
          !groupChannelsLoading && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(ChannelList, { channels: groupChannels, onJoinOrRequest: handleJoinOrRequest })
        ] })
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(EditChannelModal, { isOpen: showEditChannelModal, onClose: setShowEditChannelModal }),
    /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
      JoinChannelModal,
      {
        channel: joinOrRequestChannel,
        isOpen: Boolean(joinOrRequestChannel),
        onClose: () => {
          setJoinOrRequestChannel(null);
        }
      }
    )
  ] });
}
function ChannelList({
  channels,
  onJoinOrRequest
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
    ShowMoreOrLess,
    {
      items: channels,
      renderItem: (channel) => /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
        ChannelItem,
        {
          channel,
          onJoinOrRequest,
          onClick: () => {
            window.location.href = `/conversations?channel=${channel.id}`;
          }
        },
        channel.id
      )
    }
  );
}
function ChannelItem({
  channel,
  onClick,
  onJoinOrRequest
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)(
    "div",
    {
      "aria-label": `Channel: ${channel.name}`,
      tabIndex: 0,
      role: "button",
      onClick,
      className: "flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "flex items-center space-x-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("div", { className: "text-gray-500 dark:text-gray-400 flex items-center justify-center w-4 h-4 shrink-0", children: channel.isPublic ? "#" : /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(ClosedLock, { className: "h-4 w-4" }) }),
            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { className: "font-medium text-gray-900 dark:text-white", children: channel.name }),
            channel.isMember && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Member, { className: "w-4 h-4 text-blue-500" })
          ] }),
          Boolean(channel.hasUnreadMessages) && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(NewMessageBadge, {})
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400", children: [
          !channel.isMember && /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(
            Button,
            {
              size: "xs",
              variant: "outline",
              onClick: (e) => {
                e.stopPropagation();
                onJoinOrRequest(channel);
              },
              children: channel.isPublic ? "Join" : "Request"
            }
          ),
          channel.memberCount > 0 && /* @__PURE__ */ (0, import_jsx_runtime14.jsxs)("div", { className: "flex items-center gap-1", children: [
            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)("span", { children: channel.memberCount }),
            /* @__PURE__ */ (0, import_jsx_runtime14.jsx)(Team, { className: "h-4 w-4" })
          ] })
        ] })
      ]
    }
  );
}

// src/views/home/components/DirectChannels.tsx
var import_jsx_runtime15 = __toESM(require_jsx_runtime(), 1);
function DirectChannels() {
  const { directChannels, directChannelsLoading } = useHomeStore();
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { className: "lg:col-span-1", children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(Box, { headerRNode: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("h2", { className: "text-lg font-semibold text-gray-900 dark:text-white", children: "Direct Messages" }), children: /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: "p-2", children: [
    directChannelsLoading && /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: "min-h-48 flex items-center justify-center gap-2 dark:text-gray-400", children: [
      /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(Spinner, { className: "w-5 h-5" }),
      " Loading channels..."
    ] }),
    !directChannelsLoading && directChannels.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { className: "text-center text-gray-500 dark:text-gray-400", children: "No direct messages yet. Start a conversation with someone!" }),
    !directChannelsLoading && /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(ChannelList2, { channels: directChannels })
  ] }) }) });
}
function ChannelList2({ channels }) {
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(ShowMoreOrLess, { items: channels, renderItem: (channel) => /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(ChannelItem2, { channel }, channel.id) });
}
function ChannelItem2({ channel }) {
  return /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(
    "div",
    {
      role: "listitem",
      tabIndex: 0,
      onClick: () => {
        window.location.href = `/conversations?channel=${channel.id}`;
      },
      className: "flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200",
      children: /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: "flex items-center gap-3 flex-1 min-w-0", children: [
        /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("div", { className: "relative flex-shrink-0", children: /* @__PURE__ */ (0, import_jsx_runtime15.jsx)(UserAvatar, { user: channel.partner, online: true }) }),
        /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ (0, import_jsx_runtime15.jsxs)("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("p", { className: "text-sm font-medium text-gray-900 dark:text-white truncate", children: channel.partner.name }),
            /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("span", { className: "inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white rounded-full bg-primary dark:bg-primary-dark", children: "3" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("p", { className: "text-xs text-gray-500 dark:text-gray-400 truncate", children: "Hey, did you see the new designs?" }),
          /* @__PURE__ */ (0, import_jsx_runtime15.jsx)("p", { className: "text-xs text-gray-400 dark:text-gray-500", children: "2 min ago" })
        ] })
      ] })
    }
  );
}

// src/views/home/components/Users.tsx
var import_jsx_runtime16 = __toESM(require_jsx_runtime(), 1);
function Users() {
  const { users, usersLoading } = useHomeStore();
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("div", { className: "lg:col-span-1", children: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(
    Box,
    {
      headerRNode: /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("div", { children: [
        /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("h2", { className: "text-lg font-semibold text-gray-900 dark:text-white", children: "Team Members" }),
        /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("p", { className: "text-sm text-gray-500 dark:text-gray-400", children: "3 online" })
      ] }),
      children: /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("div", { className: "p-2", children: [
        usersLoading && /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("div", { className: "min-h-48 flex items-center justify-center gap-2 dark:text-gray-400", children: [
          /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(Spinner, { className: "w-5 h-5" }),
          " Loading users..."
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(ShowMoreOrLess, { items: users, renderItem: (user) => /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(UserItem, { user, online: true }, user.id) })
      ] })
    }
  ) });
}
function UserItem({ user, online }) {
  return /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("div", { className: "flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200", children: /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("div", { className: "flex items-center space-x-3", children: [
    /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("div", { className: "relative", children: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)(UserAvatar, { user, online }) }),
    /* @__PURE__ */ (0, import_jsx_runtime16.jsxs)("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("div", { className: "flex items-center space-x-2", children: /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("p", { className: "text-sm font-medium text-gray-900 dark:text-white truncate", children: user.name }) }),
      /* @__PURE__ */ (0, import_jsx_runtime16.jsx)("p", { className: "text-xs text-gray-500 dark:text-gray-400 capitalize", children: online ? "online" : "offline" })
    ] })
  ] }) });
}

// src/views/home/index.tsx
var import_jsx_runtime17 = __toESM(require_jsx_runtime(), 1);
function Home() {
  return /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { className: "page-container", children: [
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(HomeHeader, {}),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)("main", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6", children: /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(GroupChannels, {}),
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(DirectChannels, {}),
      /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Users, {})
    ] }) })
  ] });
}
(0, import_client.createRoot)(document.getElementById("root")).render(
  /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(import_react9.StrictMode, { children: /* @__PURE__ */ (0, import_jsx_runtime17.jsxs)(HomeStoreProvider, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(Home, {}),
    /* @__PURE__ */ (0, import_jsx_runtime17.jsx)(ToastContainer, {})
  ] }) })
);
export {
  Home as default
};
//# sourceMappingURL=home-VFQMFLI7.js.map
