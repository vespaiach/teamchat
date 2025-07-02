import {
  get,
  transformDirectChannel,
  transformDirectChannels,
  transformGroupChannel,
  transformGroupChannels
} from "./common-XUZEFEMH.js";
import {
  __toESM,
  cx,
  require_jsx_runtime,
  require_react
} from "./common-G5DJCPU6.js";

// frontend/src/views/UserAvatar.tsx
var import_react = __toESM(require_react(), 1);
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var SIZE = {
  smaller: "w-8 h-8",
  small: "w-9 h-9",
  medium: "w-12 h-12",
  large: "w-22 h-22"
};
function UserAvatar({ user, size = "small", online, className, onClick }) {
  const [avatar, setAvatar] = (0, import_react.useState)(null);
  (0, import_react.useEffect)(() => {
    const img = new Image();
    img.onload = () => {
      setAvatar(`/users/${user.id}/avatar`);
    };
    img.src = `/users/${user.id}/avatar`;
  }, [user]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    "div",
    {
      "aria-label": `${user.name}'s avatar`,
      onClick,
      role: "img",
      className: cx(
        "flex items-center justify-center bg-stone-200 bg-cover bg-center shrink-0 rounded-full relative",
        SIZE[size],
        className
      ),
      children: [
        avatar && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "img",
          {
            src: avatar,
            alt: `${user.name}'s avatar`,
            className: "object-cover object-center w-full h-full rounded-full border border-transparent"
          }
        ),
        !avatar && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-full w-full flex items-center justify-center text-sm font-medium text-white bg-primary dark:bg-primary-dark rounded-full", children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "text-xs font-medium", children: [
          user.firstName[0].toUpperCase(),
          user.lastName[0].toUpperCase()
        ] }) }),
        online !== void 0 && online !== null && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -bottom-0.5 -right-0.5", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          "div",
          {
            className: cx(
              "w-3 h-3 rounded-full bg-green-500 border-2 border-white dark:border-gray-800",
              online ? "bg-green-500" : "bg-gray-400"
            )
          }
        ) })
      ]
    }
  );
}

// frontend/src/svgs/Magnifier.tsx
var import_jsx_runtime2 = __toESM(require_jsx_runtime(), 1);
function ChevronLeft(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", ...props, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
    "path",
    {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: 2,
      d: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    }
  ) });
}

// frontend/src/svgs/Plus.tsx
var import_jsx_runtime3 = __toESM(require_jsx_runtime(), 1);
function Plus(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", ...props, children: /* @__PURE__ */ (0, import_jsx_runtime3.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 4v16m8-8H4" }) });
}

// frontend/src/hooks/useDirectChannels.ts
var import_react2 = __toESM(require_react(), 1);
function useDirectChannels() {
  const [directChannels, setDirectChannels] = (0, import_react2.useState)([]);
  const [loading, setLoading] = (0, import_react2.useState)(true);
  (0, import_react2.useEffect)(() => {
    (async () => {
      const response = await get("/conversations", { type: "direct" });
      if (response.success) {
        setDirectChannels(transformDirectChannels(response.data));
      }
      setLoading(false);
    })();
  }, []);
  return {
    setDirectChannels,
    directChannels,
    directChannelsLoading: loading
  };
}

// frontend/src/hooks/useDirectChannelsSocket.ts
var import_react3 = __toESM(require_react(), 1);

// frontend/node_modules/@rails/actioncable/app/assets/javascripts/actioncable.esm.js
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

// frontend/src/utils/ws.ts
var consumer = createConsumer();

// frontend/src/hooks/useDirectChannelsSocket.ts
function useDirectChannelsSocket(receiveChannels) {
  const receiveRef = (0, import_react3.useRef)(() => {
  });
  receiveRef.current = (channel) => {
    receiveChannels(transformDirectChannel(channel));
  };
  (0, import_react3.useEffect)(() => {
    const channel = consumer.subscriptions.create({ channel: "DirectConversationsChannel" }, {
      connected: () => {
        if (false) {
          console.log("Connected to DirectConversationsChannel");
        }
      },
      disconnected: () => {
        if (false) {
          console.log("Disconnected from DirectConversationsChannel");
        }
      },
      received: (data) => {
        receiveRef.current(data.conversation);
      }
    });
    return () => {
      channel.unsubscribe();
    };
  }, []);
}

// frontend/src/hooks/useGroupChannels.ts
var import_react4 = __toESM(require_react(), 1);
function useGroupChannels() {
  const [groupChannels, setGroupChannels] = (0, import_react4.useState)([]);
  const [loading, setLoading] = (0, import_react4.useState)(true);
  (0, import_react4.useEffect)(() => {
    (async () => {
      const response = await get("/conversations", { type: "group" });
      if (response.success) {
        setGroupChannels(transformGroupChannels(response.data));
      }
      setLoading(false);
    })();
  }, []);
  return {
    setGroupChannels,
    groupChannels,
    groupChannelsLoading: loading
  };
}

// frontend/src/hooks/useGroupChannelsSocket.ts
var import_react5 = __toESM(require_react(), 1);
function useGroupChannelsSocket(receiveChannels) {
  const receiveRef = (0, import_react5.useRef)(() => {
  });
  receiveRef.current = (channels) => {
    receiveChannels(channels);
  };
  (0, import_react5.useEffect)(() => {
    const channel = consumer.subscriptions.create(
      { channel: "GroupConversationsChannel" },
      {
        connected: () => {
          if (false) {
            console.log("Connected to GroupConversationsChannel");
          }
        },
        disconnected: () => {
          if (false) {
            console.log("Disconnected from GroupConversationsChannel");
          }
        },
        received: (data) => {
          receiveRef.current(transformGroupChannel(data.conversation));
        }
      }
    );
    return () => {
      channel.unsubscribe();
    };
  }, []);
}

// frontend/src/svgs/ChevronDown.tsx
var import_jsx_runtime4 = __toESM(require_jsx_runtime(), 1);
function ChevronDown(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", ...props, children: /* @__PURE__ */ (0, import_jsx_runtime4.jsx)("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M19 9l-7 7-7-7" }) });
}

// frontend/src/svgs/ClosedLock.tsx
var import_jsx_runtime5 = __toESM(require_jsx_runtime(), 1);
function ClosedLock(props) {
  return /* @__PURE__ */ (0, import_jsx_runtime5.jsx)("svg", { fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", ...props, children: /* @__PURE__ */ (0, import_jsx_runtime5.jsx)(
    "path",
    {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      strokeWidth: "2",
      d: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
    }
  ) });
}

// frontend/src/components/NewMessageBadge.tsx
var import_jsx_runtime6 = __toESM(require_jsx_runtime(), 1);
function NewMessageBadge() {
  return /* @__PURE__ */ (0, import_jsx_runtime6.jsx)("div", { className: "w-2 h-2 rounded-full bg-primar" });
}

export {
  UserAvatar,
  useDirectChannels,
  consumer,
  useDirectChannelsSocket,
  useGroupChannels,
  useGroupChannelsSocket,
  ChevronDown,
  ChevronLeft,
  Plus,
  ClosedLock,
  NewMessageBadge
};
