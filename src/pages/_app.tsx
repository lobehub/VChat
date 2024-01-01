import Header from '@/components/Header';
import { useConfigStore } from '@/store/config';
import { useThemeStore } from '@/store/theme';
import '@/styles/globals.css';
import { ThemeProvider } from '@lobehub/ui';
import { ThemeAppearance } from 'antd-style';
import type { AppProps } from 'next/app';
import { cookies } from 'next/headers';

import { VIDOL_THEME_APPEARANCE } from '@/constants/common';

export default function App({ Component, pageProps }: AppProps) {
  const themeMode = useThemeStore((s) => s.themeMode);
  const [primaryColor] = useConfigStore((s) => [s.config.primaryColor]);

  const cookieStore = cookies();
  const appearance = cookieStore.get(VIDOL_THEME_APPEARANCE);
  return (
    <ThemeProvider
      themeMode={themeMode}
      customTheme={{
        primaryColor: primaryColor,
      }}
      defaultAppearance={appearance?.value as ThemeAppearance}
      onAppearanceChange={(appearance) => {
        cookieStore.set(VIDOL_THEME_APPEARANCE, appearance);
      }}
    >
      <Header />
      <main style={{ display: 'flex', width: '100%' }}>
        <Component {...pageProps} />
      </main>
    </ThemeProvider>
  );
}
