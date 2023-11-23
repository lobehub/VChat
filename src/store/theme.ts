import type { ThemeMode } from 'antd-style';
import { create } from 'zustand';

interface ThemeStore {
  themeMode: ThemeMode;
  setThemeMode: (themeMode: ThemeMode) => void;
}

export const useThemeStore = create<ThemeStore>()((set) => ({
  themeMode: 'dark' as ThemeMode,
  setThemeMode: (themeMode: ThemeMode) => set({ themeMode }),
}));
