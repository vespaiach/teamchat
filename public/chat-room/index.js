import {
  __toESM,
  require_client,
  require_jsx_runtime,
  require_react
} from "../react-FEV3VREY.js";

// src/chat-room/index.tsx
var import_react7 = __toESM(require_react(), 1);
var import_client = __toESM(require_client(), 1);

// src/componets/UserAvatar.tsx
var import_react = __toESM(require_react(), 1);

// src/utils.ts
function cx(...name) {
  return name.filter(Boolean).map((s) => String(s).trim().replace(/\s+|\n/g, " ")).join(" ") || void 0;
}

// src/componets/UserAvatar.tsx
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var SIZE = {
  small: "w-9 h-9",
  medium: "w-12 h-12",
  large: "w-22 h-22"
};
function UserAvatar({
  src,
  name,
  size = "small",
  online = false,
  className,
  children,
  onClick
}) {
  const style = (0, import_react.useMemo)(() => {
    return src ? { backgroundImage: `url(${src})` } : {};
  }, [src]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      "aria-label": `${name}'s avatar`,
      onClick,
      role: "img",
      className: cx(
        "flex items-center justify-center bg-stone-200 bg-cover bg-center shrink-0 rounded-full",
        SIZE[size],
        className
      ),
      style,
      children: [
        !src && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-lg font-bold", children: name[0] }),
        online && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute right-1 bottom-3 w-full w-2 h-2 bg-green-500" }),
        children
      ]
    }
  );
}

// src/componets/Chats.tsx
var import_jsx_runtime2 = __toESM(require_jsx_runtime(), 1);
function TheirChat({ creatorAvatar, creatorName, createdAt, messages, ...rest }) {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(ChatBase, { ...rest, className: "flex w-full text-sm gap-3 px-4", children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(UserAvatar, { name: creatorName, src: creatorAvatar }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "flex-1 space-y-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "font-bold font-sans", children: creatorName }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "flex flex-col gap-2 items-start pl-2", children: [
        messages.map((items) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "bg-stone-200 inline-block p-3 rounded-r-2xl rounded-bl-2xl", children: items.message }) }, items.id)),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "text-neutral-500 ml-2 font-sans text-xs", children: createdAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true }) })
      ] })
    ] })
  ] });
}
function MyChat({ createdAt, messages, ...rest }) {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(ChatBase, { ...rest, className: "flex flex-col items-stretch gap-2 text-sm px-4", children: [
    messages.map((items) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "flex justify-end flex-1", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "bg-red-600 inline-block text-white p-3 rounded-l-2xl rounded-br-2xl max-w-[83%]", children: items.message }) }, items.id)),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "text-neutral-500 text-right mr-2 font-sans text-xs", children: createdAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true }) })
  ] });
}
function ChatBase({ children, className, id }) {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("section", { className, id, children });
}

// src/chat-room/useChatHistories.ts
var import_react2 = __toESM(require_react(), 1);

// node_modules/@rails/actioncable/app/assets/javascripts/actioncable.esm.js
var adapters = {
  logger: typeof console !== "undefined" ? console : void 0,
  WebSocket: typeof WebSocket !== "undefined" ? WebSocket : void 0
};
var logger = {
  log(...messages) {
    if (this.enabled) {
      messages.push(Date.now());
      adapters.logger.log("[ActionCable]", ...messages);
    }
  }
};
var now = () => (/* @__PURE__ */ new Date()).getTime();
var secondsSince = (time) => (now() - time) / 1e3;
var ConnectionMonitor = class {
  constructor(connection) {
    this.visibilityDidChange = this.visibilityDidChange.bind(this);
    this.connection = connection;
    this.reconnectAttempts = 0;
  }
  start() {
    if (!this.isRunning()) {
      this.startedAt = now();
      delete this.stoppedAt;
      this.startPolling();
      addEventListener("visibilitychange", this.visibilityDidChange);
      logger.log(`ConnectionMonitor started. stale threshold = ${this.constructor.staleThreshold} s`);
    }
  }
  stop() {
    if (this.isRunning()) {
      this.stoppedAt = now();
      this.stopPolling();
      removeEventListener("visibilitychange", this.visibilityDidChange);
      logger.log("ConnectionMonitor stopped");
    }
  }
  isRunning() {
    return this.startedAt && !this.stoppedAt;
  }
  recordMessage() {
    this.pingedAt = now();
  }
  recordConnect() {
    this.reconnectAttempts = 0;
    delete this.disconnectedAt;
    logger.log("ConnectionMonitor recorded connect");
  }
  recordDisconnect() {
    this.disconnectedAt = now();
    logger.log("ConnectionMonitor recorded disconnect");
  }
  startPolling() {
    this.stopPolling();
    this.poll();
  }
  stopPolling() {
    clearTimeout(this.pollTimeout);
  }
  poll() {
    this.pollTimeout = setTimeout(() => {
      this.reconnectIfStale();
      this.poll();
    }, this.getPollInterval());
  }
  getPollInterval() {
    const { staleThreshold, reconnectionBackoffRate } = this.constructor;
    const backoff = Math.pow(1 + reconnectionBackoffRate, Math.min(this.reconnectAttempts, 10));
    const jitterMax = this.reconnectAttempts === 0 ? 1 : reconnectionBackoffRate;
    const jitter = jitterMax * Math.random();
    return staleThreshold * 1e3 * backoff * (1 + jitter);
  }
  reconnectIfStale() {
    if (this.connectionIsStale()) {
      logger.log(`ConnectionMonitor detected stale connection. reconnectAttempts = ${this.reconnectAttempts}, time stale = ${secondsSince(this.refreshedAt)} s, stale threshold = ${this.constructor.staleThreshold} s`);
      this.reconnectAttempts++;
      if (this.disconnectedRecently()) {
        logger.log(`ConnectionMonitor skipping reopening recent disconnect. time disconnected = ${secondsSince(this.disconnectedAt)} s`);
      } else {
        logger.log("ConnectionMonitor reopening");
        this.connection.reopen();
      }
    }
  }
  get refreshedAt() {
    return this.pingedAt ? this.pingedAt : this.startedAt;
  }
  connectionIsStale() {
    return secondsSince(this.refreshedAt) > this.constructor.staleThreshold;
  }
  disconnectedRecently() {
    return this.disconnectedAt && secondsSince(this.disconnectedAt) < this.constructor.staleThreshold;
  }
  visibilityDidChange() {
    if (document.visibilityState === "visible") {
      setTimeout(() => {
        if (this.connectionIsStale() || !this.connection.isOpen()) {
          logger.log(`ConnectionMonitor reopening stale connection on visibilitychange. visibilityState = ${document.visibilityState}`);
          this.connection.reopen();
        }
      }, 200);
    }
  }
};
ConnectionMonitor.staleThreshold = 6;
ConnectionMonitor.reconnectionBackoffRate = 0.15;
var INTERNAL = {
  message_types: {
    welcome: "welcome",
    disconnect: "disconnect",
    ping: "ping",
    confirmation: "confirm_subscription",
    rejection: "reject_subscription"
  },
  disconnect_reasons: {
    unauthorized: "unauthorized",
    invalid_request: "invalid_request",
    server_restart: "server_restart",
    remote: "remote"
  },
  default_mount_path: "/cable",
  protocols: ["actioncable-v1-json", "actioncable-unsupported"]
};
var { message_types, protocols } = INTERNAL;
var supportedProtocols = protocols.slice(0, protocols.length - 1);
var indexOf = [].indexOf;
var Connection = class {
  constructor(consumer) {
    this.open = this.open.bind(this);
    this.consumer = consumer;
    this.subscriptions = this.consumer.subscriptions;
    this.monitor = new ConnectionMonitor(this);
    this.disconnected = true;
  }
  send(data) {
    if (this.isOpen()) {
      this.webSocket.send(JSON.stringify(data));
      return true;
    } else {
      return false;
    }
  }
  open() {
    if (this.isActive()) {
      logger.log(`Attempted to open WebSocket, but existing socket is ${this.getState()}`);
      return false;
    } else {
      const socketProtocols = [...protocols, ...this.consumer.subprotocols || []];
      logger.log(`Opening WebSocket, current state is ${this.getState()}, subprotocols: ${socketProtocols}`);
      if (this.webSocket) {
        this.uninstallEventHandlers();
      }
      this.webSocket = new adapters.WebSocket(this.consumer.url, socketProtocols);
      this.installEventHandlers();
      this.monitor.start();
      return true;
    }
  }
  close({ allowReconnect } = {
    allowReconnect: true
  }) {
    if (!allowReconnect) {
      this.monitor.stop();
    }
    if (this.isOpen()) {
      return this.webSocket.close();
    }
  }
  reopen() {
    logger.log(`Reopening WebSocket, current state is ${this.getState()}`);
    if (this.isActive()) {
      try {
        return this.close();
      } catch (error) {
        logger.log("Failed to reopen WebSocket", error);
      } finally {
        logger.log(`Reopening WebSocket in ${this.constructor.reopenDelay}ms`);
        setTimeout(this.open, this.constructor.reopenDelay);
      }
    } else {
      return this.open();
    }
  }
  getProtocol() {
    if (this.webSocket) {
      return this.webSocket.protocol;
    }
  }
  isOpen() {
    return this.isState("open");
  }
  isActive() {
    return this.isState("open", "connecting");
  }
  triedToReconnect() {
    return this.monitor.reconnectAttempts > 0;
  }
  isProtocolSupported() {
    return indexOf.call(supportedProtocols, this.getProtocol()) >= 0;
  }
  isState(...states) {
    return indexOf.call(states, this.getState()) >= 0;
  }
  getState() {
    if (this.webSocket) {
      for (let state in adapters.WebSocket) {
        if (adapters.WebSocket[state] === this.webSocket.readyState) {
          return state.toLowerCase();
        }
      }
    }
    return null;
  }
  installEventHandlers() {
    for (let eventName in this.events) {
      const handler = this.events[eventName].bind(this);
      this.webSocket[`on${eventName}`] = handler;
    }
  }
  uninstallEventHandlers() {
    for (let eventName in this.events) {
      this.webSocket[`on${eventName}`] = function() {
      };
    }
  }
};
Connection.reopenDelay = 500;
Connection.prototype.events = {
  message(event) {
    if (!this.isProtocolSupported()) {
      return;
    }
    const { identifier, message, reason, reconnect, type } = JSON.parse(event.data);
    this.monitor.recordMessage();
    switch (type) {
      case message_types.welcome:
        if (this.triedToReconnect()) {
          this.reconnectAttempted = true;
        }
        this.monitor.recordConnect();
        return this.subscriptions.reload();
      case message_types.disconnect:
        logger.log(`Disconnecting. Reason: ${reason}`);
        return this.close({
          allowReconnect: reconnect
        });
      case message_types.ping:
        return null;
      case message_types.confirmation:
        this.subscriptions.confirmSubscription(identifier);
        if (this.reconnectAttempted) {
          this.reconnectAttempted = false;
          return this.subscriptions.notify(identifier, "connected", {
            reconnected: true
          });
        } else {
          return this.subscriptions.notify(identifier, "connected", {
            reconnected: false
          });
        }
      case message_types.rejection:
        return this.subscriptions.reject(identifier);
      default:
        return this.subscriptions.notify(identifier, "received", message);
    }
  },
  open() {
    logger.log(`WebSocket onopen event, using '${this.getProtocol()}' subprotocol`);
    this.disconnected = false;
    if (!this.isProtocolSupported()) {
      logger.log("Protocol is unsupported. Stopping monitor and disconnecting.");
      return this.close({
        allowReconnect: false
      });
    }
  },
  close(event) {
    logger.log("WebSocket onclose event");
    if (this.disconnected) {
      return;
    }
    this.disconnected = true;
    this.monitor.recordDisconnect();
    return this.subscriptions.notifyAll("disconnected", {
      willAttemptReconnect: this.monitor.isRunning()
    });
  },
  error() {
    logger.log("WebSocket onerror event");
  }
};
var extend = function(object, properties) {
  if (properties != null) {
    for (let key in properties) {
      const value = properties[key];
      object[key] = value;
    }
  }
  return object;
};
var Subscription = class {
  constructor(consumer, params = {}, mixin) {
    this.consumer = consumer;
    this.identifier = JSON.stringify(params);
    extend(this, mixin);
  }
  perform(action, data = {}) {
    data.action = action;
    return this.send(data);
  }
  send(data) {
    return this.consumer.send({
      command: "message",
      identifier: this.identifier,
      data: JSON.stringify(data)
    });
  }
  unsubscribe() {
    return this.consumer.subscriptions.remove(this);
  }
};
var SubscriptionGuarantor = class {
  constructor(subscriptions) {
    this.subscriptions = subscriptions;
    this.pendingSubscriptions = [];
  }
  guarantee(subscription) {
    if (this.pendingSubscriptions.indexOf(subscription) == -1) {
      logger.log(`SubscriptionGuarantor guaranteeing ${subscription.identifier}`);
      this.pendingSubscriptions.push(subscription);
    } else {
      logger.log(`SubscriptionGuarantor already guaranteeing ${subscription.identifier}`);
    }
    this.startGuaranteeing();
  }
  forget(subscription) {
    logger.log(`SubscriptionGuarantor forgetting ${subscription.identifier}`);
    this.pendingSubscriptions = this.pendingSubscriptions.filter((s) => s !== subscription);
  }
  startGuaranteeing() {
    this.stopGuaranteeing();
    this.retrySubscribing();
  }
  stopGuaranteeing() {
    clearTimeout(this.retryTimeout);
  }
  retrySubscribing() {
    this.retryTimeout = setTimeout(() => {
      if (this.subscriptions && typeof this.subscriptions.subscribe === "function") {
        this.pendingSubscriptions.map((subscription) => {
          logger.log(`SubscriptionGuarantor resubscribing ${subscription.identifier}`);
          this.subscriptions.subscribe(subscription);
        });
      }
    }, 500);
  }
};
var Subscriptions = class {
  constructor(consumer) {
    this.consumer = consumer;
    this.guarantor = new SubscriptionGuarantor(this);
    this.subscriptions = [];
  }
  create(channelName, mixin) {
    const channel = channelName;
    const params = typeof channel === "object" ? channel : {
      channel
    };
    const subscription = new Subscription(this.consumer, params, mixin);
    return this.add(subscription);
  }
  add(subscription) {
    this.subscriptions.push(subscription);
    this.consumer.ensureActiveConnection();
    this.notify(subscription, "initialized");
    this.subscribe(subscription);
    return subscription;
  }
  remove(subscription) {
    this.forget(subscription);
    if (!this.findAll(subscription.identifier).length) {
      this.sendCommand(subscription, "unsubscribe");
    }
    return subscription;
  }
  reject(identifier) {
    return this.findAll(identifier).map((subscription) => {
      this.forget(subscription);
      this.notify(subscription, "rejected");
      return subscription;
    });
  }
  forget(subscription) {
    this.guarantor.forget(subscription);
    this.subscriptions = this.subscriptions.filter((s) => s !== subscription);
    return subscription;
  }
  findAll(identifier) {
    return this.subscriptions.filter((s) => s.identifier === identifier);
  }
  reload() {
    return this.subscriptions.map((subscription) => this.subscribe(subscription));
  }
  notifyAll(callbackName, ...args) {
    return this.subscriptions.map((subscription) => this.notify(subscription, callbackName, ...args));
  }
  notify(subscription, callbackName, ...args) {
    let subscriptions;
    if (typeof subscription === "string") {
      subscriptions = this.findAll(subscription);
    } else {
      subscriptions = [subscription];
    }
    return subscriptions.map((subscription2) => typeof subscription2[callbackName] === "function" ? subscription2[callbackName](...args) : void 0);
  }
  subscribe(subscription) {
    if (this.sendCommand(subscription, "subscribe")) {
      this.guarantor.guarantee(subscription);
    }
  }
  confirmSubscription(identifier) {
    logger.log(`Subscription confirmed ${identifier}`);
    this.findAll(identifier).map((subscription) => this.guarantor.forget(subscription));
  }
  sendCommand(subscription, command) {
    const { identifier } = subscription;
    return this.consumer.send({
      command,
      identifier
    });
  }
};
var Consumer = class {
  constructor(url) {
    this._url = url;
    this.subscriptions = new Subscriptions(this);
    this.connection = new Connection(this);
    this.subprotocols = [];
  }
  get url() {
    return createWebSocketURL(this._url);
  }
  send(data) {
    return this.connection.send(data);
  }
  connect() {
    return this.connection.open();
  }
  disconnect() {
    return this.connection.close({
      allowReconnect: false
    });
  }
  ensureActiveConnection() {
    if (!this.connection.isActive()) {
      return this.connection.open();
    }
  }
  addSubProtocol(subprotocol) {
    this.subprotocols = [...this.subprotocols, subprotocol];
  }
};
function createWebSocketURL(url) {
  if (typeof url === "function") {
    url = url();
  }
  if (url && !/^wss?:/i.test(url)) {
    const a = document.createElement("a");
    a.href = url;
    a.href = a.href;
    a.protocol = a.protocol.replace("http", "ws");
    return a.href;
  } else {
    return url;
  }
}
function createConsumer(url = getConfig("url") || INTERNAL.default_mount_path) {
  return new Consumer(url);
}
function getConfig(name) {
  const element = document.head.querySelector(`meta[name='action-cable-${name}']`);
  if (element) {
    return element.getAttribute("content");
  }
}

// src/consumer.ts
var consumer_default = createConsumer();

// src/chat-room/useChatHistories.ts
var THREE_MINUTES = 3 * 60 * 1e3;
function useChatHistories(roomId) {
  const [allChatsLoaded, setAllChatsLoaded] = (0, import_react2.useState)(false);
  const [chats, setChats] = (0, import_react2.useState)([]);
  const [loading, setLoading] = (0, import_react2.useState)(false);
  const stopLoadMoreRef = (0, import_react2.useRef)(false);
  stopLoadMoreRef.current = allChatsLoaded || loading;
  const groupedChats = (0, import_react2.useMemo)(() => {
    if (chats.length === 0) return [];
    const groups = [createGroupedChatFromDbChat(chats[0])];
    for (let i = 1; i < chats.length; i++) {
      if (chats[i].sender.id === groups[groups.length - 1].creatorId && new Date(chats[i].created_at).getTime() - groups[groups.length - 1].createdAt.getTime() < THREE_MINUTES) {
        addToGroupedChat(groups[groups.length - 1], chats[i]);
      } else {
        groups.push(createGroupedChatFromDbChat(chats[i]));
      }
    }
    return groups;
  }, [chats]);
  const loadMoreChatHistories = (0, import_react2.useCallback)(
    (lastSeenId) => {
      if (stopLoadMoreRef.current) return;
      setLoading(true);
      const query = lastSeenId !== void 0 && lastSeenId > 0 ? `?last_seen_id=${lastSeenId}` : "";
      fetch(`/rooms/${roomId}/chat_histories${query}`, {
        method: "GET",
        credentials: "include",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json"
        }
      }).then((response) => response.json()).then((data) => {
        if (data.length === 0) {
          setAllChatsLoaded(true);
          setLoading(false);
          return;
        }
        setChats((prevChats) => [...data, ...prevChats].sort((a, b) => a.id - b.id));
        setLoading(false);
      }).catch(() => {
        setLoading(false);
      });
    },
    [roomId]
  );
  (0, import_react2.useEffect)(() => {
    const channel = consumer_default.subscriptions.create(
      { channel: "ChatChannel", room_id: roomId },
      {
        received: (newChat) => {
          setChats((prevChats) => {
            const newChats = [...prevChats, newChat].sort((a, b) => a.id - b.id);
            return newChats;
          });
        }
      }
    );
    return () => {
      channel.unsubscribe();
    };
  }, [roomId]);
  (0, import_react2.useEffect)(() => {
    loadMoreChatHistories();
  }, [loadMoreChatHistories]);
  return {
    chatHistories: groupedChats,
    loadMoreChatHistories,
    loading
  };
}
function createGroupedChatFromDbChat(dbChat) {
  const createdAt = new Date(dbChat.created_at);
  const groupId = `${dbChat.sender.id}-${createdAt.getTime()}`;
  return {
    groupId,
    creatorId: dbChat.sender.id,
    creatorAvatar: dbChat.sender.avatar_url || "",
    creatorName: dbChat.sender.first_name + " " + dbChat.sender.last_name,
    createdAt,
    messages: [{ id: dbChat.id, message: dbChat.message }]
  };
}
function addToGroupedChat(groupedChat, dbChat) {
  groupedChat.messages.push({ id: dbChat.id, message: dbChat.message });
  return groupedChat;
}

// src/componets/WaveLoading.tsx
var import_jsx_runtime3 = __toESM(require_jsx_runtime(), 1);
function WaveLoading({ className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsxs)("div", { className: cx("wave-container", className), children: [
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "wave-bar bg-red-600" }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "wave-bar bg-red-600" }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "wave-bar bg-red-600" }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "wave-bar bg-red-600" }),
    /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("div", { className: "wave-bar bg-red-600" })
  ] });
}

// src/componets/TextInput.tsx
var import_jsx_runtime4 = __toESM(require_jsx_runtime(), 1);
function TextInput({ className, ...rest }) {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("input", { ...rest, className: cx("border-none rounded-xl bg-stone-100 px-4 py-3 outline-red-200", className) });
}

// src/componets/IconButton.tsx
var import_jsx_runtime5 = __toESM(require_jsx_runtime(), 1);
function IconButton({ children, className, ...rest }) {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
    "button",
    {
      ...rest,
      className: cx(
        "p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-red-50 cursor-pointer flex items-center justify-center",
        className
      ),
      children
    }
  );
}

// src/componets/ChatInput.tsx
var import_jsx_runtime6 = __toESM(require_jsx_runtime(), 1);
function ChatInput({ className, value, sending, onChange, onClick }) {
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: cx("fixed bottom-0 left-0 right-0 w-full", className), children: /* @__PURE__ */ (0, import_jsx_runtime6.jsxs)("div", { className: "viewport px-5 flex items-center gap-2 relative border-t border-t-stone-100 bg-white py-4", children: [
    /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
      TextInput,
      {
        type: "text",
        className: "flex-1 w-40 text-sm pr-12",
        placeholder: "Write your message",
        value,
        onChange
      }
    ),
    sending && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(WaveLoading, { className: "absolute right-10 top-1/2 -translate-y-1/2" }),
    !sending && /* @__PURE__ */ (0, import_jsx_runtime6.jsx)(
      IconButton,
      {
        className: "absolute w-7! h-7! right-8 top-1/2 -translate-y-1/2 text-white rounded-lg! bg-red-500!",
        onClick,
        children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("svg", { xmlns: "http://www.w3.org/2000/svg", height: "1em", fill: "currentColor", viewBox: "0 0 512 512", children: /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("path", { d: "M 137.65570599613153 232.2321083172147 L 70.31334622823985 97.54738878143134 L 137.65570599613153 232.2321083172147 L 70.31334622823985 97.54738878143134 L 384.247582205029 232.2321083172147 L 384.247582205029 232.2321083172147 L 137.65570599613153 232.2321083172147 L 137.65570599613153 232.2321083172147 Z M 137.65570599613153 279.7678916827853 L 384.247582205029 279.7678916827853 L 137.65570599613153 279.7678916827853 L 384.247582205029 279.7678916827853 L 70.31334622823985 414.4526112185687 L 70.31334622823985 414.4526112185687 L 137.65570599613153 279.7678916827853 L 137.65570599613153 279.7678916827853 Z M 49.516441005802704 37.13733075435203 Q 28.719535783365572 29.214700193423596 13.864603481624759 44.06963249516441 Q 0 59.91489361702128 7.922630560928433 79.72147001934236 L 96.06189555125725 256 L 96.06189555125725 256 L 7.922630560928433 432.27852998065765 L 7.922630560928433 432.27852998065765 Q 0 452.0851063829787 13.864603481624759 467.9303675048356 Q 28.719535783365572 482.7852998065764 49.516441005802704 475.85299806576404 L 493.18375241779495 285.7098646034816 L 493.18375241779495 285.7098646034816 Q 511.0096711798839 276.79690522243715 512 256 Q 511.0096711798839 236.19342359767893 493.18375241779495 227.28046421663444 L 49.516441005802704 37.13733075435203 L 49.516441005802704 37.13733075435203 Z" }) })
      }
    )
  ] }) });
}

// src/componets/ChatRoomHeader.tsx
var import_react3 = __toESM(require_react(), 1);
var import_jsx_runtime7 = __toESM(require_jsx_runtime(), 1);
function ChatRoomHeader({ className, user, room }) {
  const headerRef = (0, import_react3.useRef)(null);
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(
    "div",
    {
      ref: headerRef,
      className: cx(
        "sticky z-50 top-0 w-full bg-white flex items-center gap-2 px-5 py-4",
        "border-b border-gray-200 shadow-[0_4px_3px_-3px_rgba(0,0,0,0.1)]",
        className
      ),
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(IconButton, { children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("svg", { width: "14", height: "10", viewBox: "0 0 14 10", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(
          "path",
          {
            d: "M5 1L1 5M1 5L5 9M1 5L13 5",
            stroke: "#000E08",
            strokeWidth: "1.5",
            strokeLinecap: "round",
            strokeLinejoin: "round"
          }
        ) }) }),
        !!user && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(UserHeader, { ...user }),
        !!room && /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(GroupHeader, { ...room })
      ]
    }
  );
}
function UserHeader({ name, online, avatar }) {
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_jsx_runtime7.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(UserAvatar, { name, online, src: avatar }),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("p", { className: "font-sans font-bold text-base", children: "name" }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("p", { className: "text-stone-300 text-xs", children: online ? "Active now" : "Offline" })
    ] })
  ] });
}
function GroupHeader({
  name,
  onlineMembers,
  totalMembers
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)(import_jsx_runtime7.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime7.jsx)(UserAvatar, { name: "Group" }),
    /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("div", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime7.jsx)("p", { className: "font-sans font-bold text-base", children: name }),
      /* @__PURE__ */ (0, import_jsx_runtime7.jsxs)("p", { className: "text-stone-300 text-xs", children: [
        totalMembers,
        " members",
        onlineMembers ? `, ${onlineMembers} online` : ""
      ] })
    ] })
  ] });
}

// node_modules/@uidotdev/usehooks/index.js
var React = __toESM(require_react(), 1);
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = React.useState(value);
  React.useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  return debouncedValue;
}
function useWindowScroll() {
  const [state, setState] = React.useState({
    x: null,
    y: null
  });
  const scrollTo = React.useCallback((...args) => {
    if (typeof args[0] === "object") {
      window.scrollTo(args[0]);
    } else if (typeof args[0] === "number" && typeof args[1] === "number") {
      window.scrollTo(args[0], args[1]);
    } else {
      throw new Error(
        `Invalid arguments passed to scrollTo. See here for more info. https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo`
      );
    }
  }, []);
  React.useLayoutEffect(() => {
    const handleScroll = () => {
      setState({ x: window.scrollX, y: window.scrollY });
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return [state, scrollTo];
}

// src/chat-room/useLoadMoreHistoriesOnScrolling.ts
var import_react4 = __toESM(require_react(), 1);
function useLoadMoreHistoriesOnScrolling(loadMoreChatHistories, chatHistories, loading) {
  const [{ y }] = useWindowScroll();
  const debouncedY = useDebounce(y, 100);
  const loadRef = (0, import_react4.useRef)(() => {
  });
  loadRef.current = () => {
    if (loading) return;
    loadMoreChatHistories(chatHistories.length > 0 ? chatHistories[0].messages[0].id : void 0);
  };
  (0, import_react4.useEffect)(() => {
    if (debouncedY !== null && debouncedY < 50) {
      loadRef.current();
    }
  }, [debouncedY]);
}

// src/chat-room/useSending.ts
var import_react5 = __toESM(require_react(), 1);
function useSendingChat(roomId) {
  const [sending, setSending] = (0, import_react5.useState)(false);
  const [chat, setChat] = (0, import_react5.useState)("");
  const sendingRef = (0, import_react5.useRef)(() => {
  });
  sendingRef.current = async () => {
    if (sending) return;
    setSending(true);
    try {
      const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute("content");
      const headers = {
        "Content-Type": "application/json"
      };
      if (csrfToken) {
        headers["X-CSRF-Token"] = csrfToken;
      }
      const response = await fetch(`/rooms/${roomId}/chats`, {
        method: "POST",
        headers,
        body: JSON.stringify({ message: chat })
      });
      if (!response.ok) {
        throw new Error("Failed to send chat");
      }
      await response.json();
      setChat("");
    } catch (error) {
      console.error("Error sending chat:", error);
    } finally {
      setSending(false);
    }
  };
  const sendChat = (0, import_react5.useCallback)(async () => {
    await sendingRef.current();
  }, []);
  const handleChatChange = (0, import_react5.useCallback)((e) => {
    setChat(e.target.value);
  }, []);
  return { chat, handleChatChange, sending, sendChat };
}

// src/componets/DayBreaker.tsx
var import_jsx_runtime8 = __toESM(require_jsx_runtime(), 1);
function DayBreaker({ date }) {
  const isToday = date.toDateString() === (/* @__PURE__ */ new Date()).toDateString();
  return /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("div", { className: "flex items-center text-neutral-500 px-4 justify-center py-6", children: /* @__PURE__ */ (0, import_jsx_runtime8.jsx)("span", { className: "px-2 font-sans bg-stone-100 rounded px-2 shrink-0", children: isToday ? "Today" : date.toDateString() }) });
}

// src/componets/AutoScrollIntoView.tsx
var import_react6 = __toESM(require_react(), 1);
var import_jsx_runtime9 = __toESM(require_jsx_runtime(), 1);
function AutoScrollIntoView({ className }) {
  const ref = (0, import_react6.useRef)(null);
  (0, import_react6.useEffect)(() => {
    setTimeout(() => {
      ref.current?.scrollIntoView({
        behavior: "smooth",
        block: "end"
      });
    }, 200);
  }, []);
  return /* @__PURE__ */ (0, import_jsx_runtime9.jsx)("div", { ref, className });
}

// src/chat-room/index.tsx
var import_jsx_runtime10 = __toESM(require_jsx_runtime(), 1);
function ChatRoom({ loggedInUser, room }) {
  const { chatHistories, loadMoreChatHistories, loading } = useChatHistories(room.id);
  useLoadMoreHistoriesOnScrolling(loadMoreChatHistories, chatHistories, loading);
  const { chat, handleChatChange, sendChat, sending } = useSendingChat(room.id);
  return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(import_jsx_runtime10.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)("div", { className: "viewport space-y-10 min-h-dvh bg-white", children: [
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(ChatRoomHeader, { room }),
      /* @__PURE__ */ (0, import_jsx_runtime10.jsx)("div", { className: "flex justify-center items-center pt-2", children: /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(WaveLoading, { className: loading ? "visible" : "invisible" }) }),
      chatHistories.map((chat2, index) => {
        const showDayBreak = index === 0 || chatHistories[index - 1].createdAt.toDateString() !== chat2.createdAt.toDateString();
        const ChatComponent = chat2.creatorId === loggedInUser.id ? MyChat : TheirChat;
        return /* @__PURE__ */ (0, import_jsx_runtime10.jsxs)(import_react7.Fragment, { children: [
          showDayBreak && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(DayBreaker, { date: chat2.createdAt }),
          /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(
            ChatComponent,
            {
              creatorAvatar: chat2.creatorAvatar,
              creatorName: chat2.creatorName,
              createdAt: chat2.createdAt,
              messages: chat2.messages
            }
          ),
          index === chatHistories.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(AutoScrollIntoView, { className: "h-14" }, chat2.messages.length)
        ] }, chat2.groupId);
      })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime10.jsx)(ChatInput, { value: chat, onChange: handleChatChange, onClick: sendChat, sending })
  ] });
}
var container = document.getElementById("chat-room");
if (container) {
  const root = (0, import_client.createRoot)(container);
  const currentUser = JSON.parse(document.getElementById("current-user-data").textContent);
  const room = JSON.parse(document.getElementById("room-data").textContent);
  root.render(/* @__PURE__ */ (0, import_jsx_runtime10.jsx)(ChatRoom, { loggedInUser: currentUser, room }));
}
//# sourceMappingURL=index.js.map
