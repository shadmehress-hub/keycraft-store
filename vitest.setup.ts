// Mock localStorage baraye environment-e Node.js dar Vitest
const store: Record<string, string> = {};

const localStorageMock = {
  getItem: (key: string) => store[key] ?? null,
  setItem: (key: string, value: string) => {
    store[key] = String(value);
  },
  removeItem: (key: string) => {
    delete store[key];
  },
  clear: () => {
    for (const key of Object.keys(store)) {
      delete store[key];
    }
  },
  key: (index: number) => Object.keys(store)[index] ?? null,
  length: 0,
};

Object.defineProperty(globalThis, "localStorage", {
  value: localStorageMock,
  writable: true,
});

if (typeof window === "undefined") {
  (globalThis as any).window = {
    localStorage: localStorageMock,
  };
}

