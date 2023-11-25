import Header from '@/components/Header';
import { useThemeStore } from '@/store/theme';
import '@/styles/globals.css';
import { ThemeProvider } from '@lobehub/ui';
import { ThemeProvider as AntdThemeProvider } from 'antd-style';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  const themeMode = useThemeStore((s) => s.themeMode);
  return (
    <AntdThemeProvider themeMode={themeMode}>
      <ThemeProvider themeMode={themeMode}>
        <Header />
        <main style={{ display: 'flex', width: '100%' }}>
          <Component {...pageProps} />
        </main>
      </ThemeProvider>
    </AntdThemeProvider>
  );
}
