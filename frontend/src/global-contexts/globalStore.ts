const store: Record<string, unknown> = {}
let listeners: Array<() => void> = [];

export const globalStore = {
  addToStore(key: string, value: unknown) {
    store[key] = value;
    emitChange();
  },

  subscribe(listener: () => void) {
    listeners = [...listeners, listener];
    return () => {
      listeners = listeners.filter(l => l !== listener);
    };
  },

  getSnapshot() {
    return store;
  }
};

function emitChange() {
  for (const l of listeners) {
    l();
  }
}
