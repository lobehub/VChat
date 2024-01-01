import type { ThemeMode } from 'antd-style';
import { shallow } from 'zustand/shallow';
import { createWithEqualityFn } from 'zustand/traditional';

interface ThemeStore {
  themeMode: ThemeMode;
  setThemeMode: (themeMode: ThemeMode) => void;
}

export const useThemeStore = createWithEqualityFn<ThemeStore>()(
  (set) => ({
    themeMode: 'auto' as ThemeMode,
    setThemeMode: (themeMode: ThemeMode) => set({ themeMode }),
  }),
  shallow,
);
