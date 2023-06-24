import type { ThemeMode } from 'antd-style';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Store {
  themeMode: ThemeMode;
  setThemeMode: (themeMode: ThemeMode) => void,
}
export const useThemeStore = create<Store>()(
  persist(
    (set) => ({
      themeMode: 'dark' as ThemeMode,
      setThemeMode: (themeMode: ThemeMode) => set({ themeMode }),
    }),
    { name: 'VIDOL_THEME_MODE' },
  ),
);
