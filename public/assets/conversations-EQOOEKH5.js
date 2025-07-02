import {
  ChevronDown,
  ChevronLeft,
  ClosedLock,
  NewMessageBadge,
  Plus,
  UserAvatar,
  useDirectChannels,
  useDirectChannelsSocket,
  useGroupChannels,
  useGroupChannelsSocket
} from "./common-LMLLZPR5.js";
import {
  IconButton,
  getPredefinedData,
  transformUser
} from "./common-XUZEFEMH.js";
import {
  TextBox
} from "./common-ZDTFTHKU.js";
import {
  Button,
  Logo,
  __toESM,
  cx,
  require_client,
  require_jsx_runtime,
  require_react
} from "./common-G5DJCPU6.js";

// frontend/src/views/conversations/index.tsx
var import_react4 = __toESM(require_react(), 1);
var import_client = __toESM(require_client(), 1);

// frontend/src/views/conversations/SideBar/GroupChannels.tsx
var import_react2 = __toESM(require_react(), 1);

// frontend/src/components/PoundSignIcon.tsx
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
function PoundSignIcon({ className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cx("block flex items-center justify-center", className), children: "#" });
}

// frontend/src/views/conversations/store.tsx
var import_react = __toESM(require_react(), 1);
var import_jsx_runtime2 = __toESM(require_jsx_runtime(), 1);
var userResponse = getPredefinedData("logged-in-user");
if (!userResponse) {
  throw new Error("User data not found. Ensure the user data is embedded in the HTML.");
}
var ConversationsContext = (0, import_react.createContext)({
  groupChannels: [],
  groupChannelsLoading: true,
  directChannels: [],
  directChannelsLoading: true,
  loggedInUser: transformUser(userResponse),
  selectedChannelId: null,
  selectChannel: () => {
  }
});
function ConversationsStoreProvider({ children }) {
  const [selectedChannelId, setSelectedChannelId] = (0, import_react.useState)(null);
  const [loggedInUser] = (0, import_react.useState)(transformUser(userResponse));
  const { groupChannelsLoading, groupChannels, setGroupChannels } = useGroupChannels();
  const { directChannelsLoading, directChannels, setDirectChannels } = useDirectChannels();
  const extendedDirectChannels = (0, import_react.useMemo)(() => {
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
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    ConversationsContext.Provider,
    {
      value: {
        groupChannels,
        groupChannelsLoading,
        directChannels: extendedDirectChannels,
        directChannelsLoading,
        loggedInUser,
        selectedChannelId,
        selectChannel: setSelectedChannelId
      },
      children
    }
  );
}
function useConversationsStore() {
  const context = (0, import_react.useContext)(ConversationsContext);
  if (!context) {
    throw new Error("useConversationsStore must be used within a ConversationsContext");
  }
  return context;
}

// frontend/src/views/conversations/SideBar/GroupChannels.tsx
var import_jsx_runtime3 = __toESM(require_jsx_runtime(), 1);
function GroupChannels() {
  const { groupChannelsLoading, groupChannels, selectChannel, selectedChannelId } = useConversationsStore();
  const [showChannels, setShowChannels] = (0, import_react2.useState)(true);
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "p-3", children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex items-center justify-between mb-3", children: [
      /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)(
        "h3",
        {
          className: "text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-1 cursor-pointer",
          role: "button",
          tabIndex: 0,
          onClick: () => {
            setShowChannels(!showChannels);
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ChevronDown, { className: cx("h-3 w-3 transition-transform", !showChannels && "rotate-180") }),
            "Channels"
          ]
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(IconButton, { variant: "ghost", size: "sm", className: "p-1 h-6 w-6", "aria-label": "Add channel", icon: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(Plus, {}) })
    ] }),
    groupChannelsLoading && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "flex items-center justify-center h-12 text-gray-500 dark:text-gray-400", children: "Loading channels..." }),
    !groupChannelsLoading && groupChannels.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "text-gray-500 dark:text-gray-400 text-sm text-center", children: "No channels available. Create or join a channel to start chatting." }),
    showChannels && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "space-y-1", children: groupChannels.map((channel) => /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
      ChannelItem,
      {
        channel,
        onClick: () => selectChannel(channel.id),
        selected: channel.id === selectedChannelId
      },
      channel.id
    )) })
  ] });
}
function ChannelItem({ channel, selected = false, onClick }) {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(
    "div",
    {
      onClick,
      role: "menuitem",
      tabIndex: 0,
      className: cx(
        "flex items-center justify-between px-2 py-1.5 rounded cursor-pointer transition-colors duration-200",
        selected ? "bg-blue-100 dark:bg-blue-900/30 text-blue-900 dark:text-blue-100" : "hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
      ),
      children: /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: "flex items-center space-x-2 flex-1 min-w-0", children: [
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "text-gray-500 dark:text-gray-400", children: channel.isPublic ? /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(PoundSignIcon, {}) : /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(ClosedLock, {}) }),
        /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("span", { className: "text-sm font-medium truncate", children: channel.name }),
        channel.hasUnreadMessages && /* @__PURE__ */ (0, import_jsx_runtime3.jsx)(NewMessageBadge, {})
      ] })
    }
  );
}

// frontend/src/views/conversations/SideBar/DirectChannels.tsx
var import_react3 = __toESM(require_react(), 1);
var import_jsx_runtime4 = __toESM(require_jsx_runtime(), 1);
function DirectChannels() {
  const { directChannels, directChannelsLoading, selectedChannelId, selectChannel } = useConversationsStore();
  const [showChannels, setShowChannels] = (0, import_react3.useState)(true);
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "p-3", children: [
    /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex items-center justify-between mb-3", children: [
      /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
        "h3",
        {
          className: "text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-1 cursor-pointer",
          role: "button",
          tabIndex: 0,
          onClick: () => {
            setShowChannels(!showChannels);
          },
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(ChevronDown, { className: cx("h-3 w-3 transition-transform", !showChannels && "rotate-180") }),
            "Direct Messages"
          ]
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(IconButton, { variant: "ghost", size: "sm", className: "p-1 h-6 w-6", "aria-label": "Add channel", icon: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(Plus, {}) })
    ] }),
    directChannelsLoading && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "flex items-center justify-center h-12 text-gray-500 dark:text-gray-400", children: "Loading channels..." }),
    showChannels && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "space-y-1", children: directChannels.map((channel) => /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(
      ChannelItem2,
      {
        channel,
        onClick: () => selectChannel(channel.id),
        selected: channel.id === selectedChannelId
      },
      channel.id
    )) })
  ] });
}
function ChannelItem2({ channel, selected = false, onClick }) {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)(
    "div",
    {
      onClick,
      role: "menuitem",
      tabIndex: 0,
      className: cx(
        "flex items-center gap-2 px-2 py-1.5 rounded cursor-pointer  transition-colors duration-200",
        selected ? "bg-blue-100 dark:bg-blue-900/30" : "hover:bg-gray-100 dark:hover:bg-gray-700"
      ),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "relative", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(UserAvatar, { user: channel.partner }) }),
        /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("div", { className: "flex-1 min-w-0", children: /* @__PURE__ */ (0, import_jsx_runtime4.jsxs)("div", { className: "flex items-center space-x-1", children: [
          /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("span", { className: "text-sm font-medium text-gray-900 dark:text-white truncate", children: channel.partner.name }),
          channel.hasUnreadMessages && /* @__PURE__ */ (0, import_jsx_runtime4.jsx)(NewMessageBadge, {})
        ] }) })
      ]
    }
  );
}

// frontend/src/views/conversations/index.tsx
var import_jsx_runtime5 = __toESM(require_jsx_runtime(), 1);
function Conversations() {
  const { selectedChannelId, selectChannel, groupChannels, directChannels, loggedInUser } = useConversationsStore();
  (0, import_react4.useEffect)(() => {
    if (selectedChannelId === null) {
      const channelId = parseInt(new URLSearchParams(window.location.search).get("channel") ?? "0", 10);
      const channel = groupChannels.find((c) => c.id === channelId);
      if (channel) {
        selectChannel(channel.id);
        return;
      }
      const dm = directChannels.find((c) => c.id === channelId);
      if (dm) {
        selectChannel(dm.id);
        return;
      }
      if (groupChannels.length > 0) {
        selectChannel(groupChannels[0].id);
      }
      if (directChannels.length > 0) {
        selectChannel(directChannels[0].id);
      }
    }
  }, [selectedChannelId, groupChannels, directChannels, selectChannel]);
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "page-container flex", children: [
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "w-80 bg-gray-50 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col transition-colors duration-200", children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "p-4 border-b border-gray-200 dark:border-gray-700", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex items-center justify-between mb-4", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Logo, { size: 28 }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "flex items-center space-x-2", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Button, { variant: "primary", size: "sm", className: "px-3", leftIcon: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Plus, { className: "h-4 w-4" }), children: "New" }) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
          TextBox,
          {
            name: "search",
            placeholder: "Search TeamChat",
            size: "sm",
            icon: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(ChevronLeft, { className: "h-4 w-4 text-gray-400" })
          }
        )
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex-1 overflow-y-auto", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(GroupChannels, {}),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(DirectChannels, {})
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "p-3 border-t border-gray-200 dark:border-gray-700", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex items-center space-x-3 px-2 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "relative", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(UserAvatar, { user: loggedInUser }) }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex-1", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "text-sm font-medium text-gray-900 dark:text-white", children: loggedInUser.name }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "text-xs text-gray-500 dark:text-gray-400", children: "Available" })
        ] })
      ] }) })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex-1 flex flex-col", children: [
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 px-6 flex items-center justify-between transition-colors duration-200", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex items-center space-x-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("h1", { className: "text-xl font-semibold text-gray-900 dark:text-white", children: "# general" }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400", children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("svg", { className: "h-4 w-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
              }
            ) }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { children: "12 members" })
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
            Button,
            {
              variant: "ghost",
              size: "sm",
              onClick: () => window.location.href = "/home",
              leftIcon: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("svg", { className: "h-4 w-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                }
              ) }),
              children: "Home"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
            Button,
            {
              variant: "ghost",
              size: "sm",
              leftIcon: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("svg", { className: "h-4 w-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                }
              ) }),
              children: "Details"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "flex-1 overflow-y-auto p-6 space-y-4", children: [].map((message) => /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)(
        "div",
        {
          className: `flex items-start space-x-3 ${message.isOwnMessage ? "flex-row-reverse space-x-reverse" : ""}`,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "flex-shrink-0", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
              "div",
              {
                className: "w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium text-white",
                style: { backgroundColor: "var(--primary)" },
                children: message.avatar
              }
            ) }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: `flex-1 ${message.isOwnMessage ? "text-right" : ""}`, children: [
              /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: `flex items-center space-x-2 mb-1 ${message.isOwnMessage ? "justify-end" : ""}`, children: [
                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-sm font-semibold text-gray-900 dark:text-white", children: message.user }),
                /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("span", { className: "text-xs text-gray-500 dark:text-gray-400", children: message.timestamp })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
                "div",
                {
                  className: `inline-block max-w-lg px-4 py-2 rounded-lg ${message.isOwnMessage ? "text-white" : "bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"}`,
                  style: message.isOwnMessage ? { backgroundColor: "var(--primary)" } : {},
                  children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("p", { className: "text-sm", children: message.content })
                }
              )
            ] })
          ]
        },
        message.id
      )) }),
      /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "p-4 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 transition-colors duration-200", children: [
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex items-end space-x-3", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("div", { className: "flex-1", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
            TextBox,
            {
              name: "message",
              placeholder: "Type a message...",
              className: "pr-20",
              icon: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("svg", { className: "h-5 w-5 text-gray-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                }
              ) }),
              iconPosition: "right"
            }
          ) }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
            Button,
            {
              variant: "primary",
              size: "md",
              leftIcon: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("svg", { className: "h-4 w-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                }
              ) }),
              children: "Send"
            }
          )
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex items-center justify-between mt-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "flex items-center space-x-3", children: [
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { className: "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("svg", { className: "h-4 w-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              }
            ) }) }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { className: "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("svg", { className: "h-4 w-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 110 2h-1v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6H3a1 1 0 110-2h4z"
              }
            ) }) }),
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("button", { className: "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("svg", { className: "h-4 w-4", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
              "path",
              {
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeWidth: 2,
                d: "M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
              }
            ) }) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime5.jsxs)("div", { className: "text-xs text-gray-500 dark:text-gray-400", children: [
            "Press",
            " ",
            /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("kbd", { className: "px-1 py-0.5 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700", children: "Enter" }),
            " ",
            "to send"
          ] })
        ] })
      ] })
    ] })
  ] });
}
(0, import_client.createRoot)(document.getElementById("root")).render(
  /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(import_react4.StrictMode, { children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(ConversationsStoreProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(Conversations, {}) }) })
);
export {
  Conversations as default
};
