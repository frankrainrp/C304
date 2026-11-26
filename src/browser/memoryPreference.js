export function createMemoryPreference(initial) {
  let current = initial;
  const listeners = new Set();

  return {
    get: () => current,
    set(value) {
      if (Object.is(current, value)) return;
      current = value;
      for (const listener of listeners) listener();
    },
    subscribe(listener) {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
  };
}
