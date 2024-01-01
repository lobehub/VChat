'use client';

import Header from '@/layout/Header';
import { useConfigStore } from '@/store/config';
import { useThemeStore } from '@/store/theme';
import '@/styles/globals.css';
import { ThemeProvider } from '@lobehub/ui';
import { ThemeAppearance } from 'antd-style';

import { VIDOL_THEME_APPEARANCE } from '@/constants/common';
import { setCookie } from '@/utils/cookie';
import { ReactNode } from 'react';

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
    </ThemeProvider>
  );
}
