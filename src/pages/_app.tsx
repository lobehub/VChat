import Header from '@/components/Header';
import { useConfigStore } from '@/store/config';
import { useThemeStore } from '@/store/theme';
import '@/styles/globals.css';
import { ThemeProvider } from '@lobehub/ui';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  const themeMode = useThemeStore((s) => s.themeMode);
  const [primaryColor] = useConfigStore((s) => [s.config.primaryColor]);
  return (
    <ThemeProvider
      themeMode={themeMode}
      customTheme={{
        primaryColor: primaryColor,
      }}
    >
      <Header />
      <main style={{ display: 'flex', width: '100%' }}>
        <Component {...pageProps} />
      </main>
    </ThemeProvider>
  );
}
