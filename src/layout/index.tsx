'use client';

import { VIDOL_THEME_APPEARANCE } from '@/constants/common';
import { useConfigStore } from '@/store/config';
import { useThemeStore } from '@/store/theme';
import '@/styles/globals.css';
import { setCookie } from '@/utils/cookie';
import { ThemeProvider } from '@lobehub/ui';
import { ThemeAppearance } from 'antd-style';
import { ReactNode } from 'react';
import Background from './Background';
import Header from './Header';

export interface LayoutProps {
  children?: ReactNode;
  defaultAppearance?: ThemeAppearance;
}

export default function App(props: LayoutProps) {
  const { children, defaultAppearance } = props;
  const themeMode = useThemeStore((s) => s.themeMode);
  const [primaryColor] = useConfigStore((s) => [s.config.primaryColor]);

  return (
    <ThemeProvider
      themeMode={themeMode}
      customTheme={{
        primaryColor: primaryColor,
      }}
      defaultAppearance={defaultAppearance as ThemeAppearance}
      onAppearanceChange={(appearance) => {
        setCookie(VIDOL_THEME_APPEARANCE, appearance);
      }}
    >
      <Header />
      <main style={{ display: 'flex', width: '100%' }}>{children}</main>
      <Background />
    </ThemeProvider>
  );
}
