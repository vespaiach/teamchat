import {
  __toESM,
  require_client,
  require_jsx_runtime,
  require_react
} from "../react-FEV3VREY.js";

// src/chat-room/index.tsx
var import_react2 = __toESM(require_react(), 1);
var import_client = __toESM(require_client(), 1);

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
  constructor(consumer2) {
    this.open = this.open.bind(this);
    this.consumer = consumer2;
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
  constructor(consumer2, params = {}, mixin) {
    this.consumer = consumer2;
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
  constructor(consumer2) {
    this.consumer = consumer2;
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

// src/chat-room/Chat.tsx
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
function TheirChat({ creatorAvatar, creatorName, createdAt, messages }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { className: "flex w-full text-sm gap-4 px-4", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", { src: creatorAvatar, alt: `${creatorName}'s avatar`, className: "w-10 h-10 rounded-full shrink-0" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex-1 space-y-2", children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "font-bold", children: creatorName }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex flex-col gap-2 items-start pl-2", children: [
        messages.map((message, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "bg-stone-200 inline-block p-3 rounded-r-2xl rounded-bl-2xl", children: message }) }, index)),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-neutral-500 ml-2 font-sans text-xs", children: createdAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true }) })
      ] })
    ] })
  ] });
}
function MyChat({ createdAt, messages }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { className: "flex flex-col items-end gap-2 text-sm px-4", children: [
    messages.map((message, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "flex justify-end", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "bg-red-600 inline-block text-white p-3 rounded-l-2xl rounded-br-2xl w-[83%]", children: message }) }, index)),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { className: "text-neutral-500 text-right mr-2 font-sans text-xs", children: createdAt.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true }) })
  ] });
}
function DayBreak({ date }) {
  const isToday = date.toDateString() === (/* @__PURE__ */ new Date()).toDateString();
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "flex items-center text-neutral-500", children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", { className: "flex-1 border-t border-stone-100 flex-1" }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "px-2 font-sans bg-stone-100 rounded px-2 shrink-0", children: isToday ? "Today" : date.toLocaleDateString() }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", { className: "flex-1 border-t border-stone-100 flex-1" })
  ] });
}

// src/chat-room/useChatHistories.ts
var import_react = __toESM(require_react(), 1);
var FIVE_MINUTES = 5 * 60 * 1e3;
function useChatHistories(roomId) {
  const [dbChats, setDbChats] = (0, import_react.useState)([]);
  const [loading, setLoading] = (0, import_react.useState)(false);
  const groupedChats = (0, import_react.useMemo)(() => {
    if (dbChats.length === 0) return [];
    const groups = [dbChats[0]];
    for (let i = 1; i < dbChats.length; i++) {
      if (dbChats[i].creatorId === groups[groups.length - 1].creatorId && dbChats[i].createdAt.getTime() - groups[groups.length - 1].createdAt.getTime() < FIVE_MINUTES) {
        groups[groups.length - 1].messages.push(dbChats[i].messages[0]);
      } else {
        groups.push(dbChats[i]);
      }
    }
    return groups;
  }, [dbChats]);
  const loadMoreChatHistories = (0, import_react.useCallback)((lastSeenId) => {
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
      setDbChats(
        (prevChats) => [...prevChats, ...data.map(tranformDbChatToChat)].sort((a, b) => a.id - b.id)
      );
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  }, [roomId]);
  (0, import_react.useEffect)(() => {
    loadMoreChatHistories();
  }, [loadMoreChatHistories]);
  return {
    chatHistories: groupedChats,
    loading
  };
}
function tranformDbChatToChat(dbChat) {
  return {
    id: dbChat.id,
    creatorId: dbChat.sender.id,
    creatorAvatar: dbChat.sender.avatar_url || "",
    creatorName: `${dbChat.sender.first_name} ${dbChat.sender.last_name}`,
    createdAt: new Date(dbChat.created_at),
    messages: [dbChat.message]
  };
}

// src/chat-room/index.tsx
var import_jsx_runtime2 = __toESM(require_jsx_runtime(), 1);
var consumer = createConsumer();
function ChatRoom({ roomId, loggedInUserId }) {
  const { chatHistories, loadMoreChatHistories, loading } = useChatHistories(roomId);
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "viewport space-y-10", children: chatHistories.map((chat, index) => {
    const showDayBreak = index === 0 || chatHistories[index - 1].createdAt.toDateString() !== chat.createdAt.toDateString();
    const ChatComponent = chat.creatorId === loggedInUserId ? MyChat : TheirChat;
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_react2.Fragment, { children: [
      showDayBreak && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(DayBreak, { date: chat.createdAt }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        ChatComponent,
        {
          creatorAvatar: chat.creatorAvatar,
          creatorName: chat.creatorName,
          createdAt: chat.createdAt,
          messages: chat.messages
        }
      )
    ] }, chat.id);
  }) });
}
var container = document.getElementById("chat-room");
if (container) {
  const root = (0, import_client.createRoot)(container);
  root.render(
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ChatRoom, { roomId: parseInt(container.dataset.roomId), loggedInUserId: parseInt(container.dataset.loggedInUserId) })
  );
}
//# sourceMappingURL=index.js.map
