import { beforeEach, vi } from 'vitest';

// Mock localStorage for tests
const localStorageMock = {
  getItem: (key: string) => {
    return localStorageMock.store[key] || null;
  },
  setItem: (key: string, value: string) => {
    localStorageMock.store[key] = value;
  },
  removeItem: (key: string) => {
    delete localStorageMock.store[key];
  },
  clear: () => {
    localStorageMock.store = {};
  },
  store: {} as { [key: string]: string }
};

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock
});

// Mock crypto.randomUUID for tests
Object.defineProperty(global, 'crypto', {
  value: {
    randomUUID: () => Math.random().toString(36).substring(2, 15)
  }
});

// Mock document.documentElement.setAttribute
Object.defineProperty(document, 'documentElement', {
  value: {
    setAttribute: vi.fn(),
    style: {
      setProperty: vi.fn()
    }
  }
});

// Clear localStorage before each test
beforeEach(() => {
  localStorageMock.clear();
});
