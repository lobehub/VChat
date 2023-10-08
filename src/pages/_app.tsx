import AgentViewer from '@/components/AgentViewer';
import Header from '@/components/Header';
import SideNav from '@/features/ControlPanel/SideNav';
import { useSessionStore } from '@/store/session';
import { useThemeStore } from '@/store/theme';
import '@/styles/globals.css';
import { ThemeProvider } from '@lobehub/ui';
import { ThemeProvider as AntdThemeProvider } from 'antd-style';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  const themeMode = useThemeStore((s) => s.themeMode);
  const { currentAgent } = useSessionStore();
  return (
    <AntdThemeProvider themeMode={themeMode}>
      <ThemeProvider themeMode={themeMode}>
        <Header />
        <main style={{ display: 'flex', width: '100%' }}>
          <SideNav />
          <div style={{ display: 'flex', width: '100%' }}>
            <Component {...pageProps} />
          </div>
        </main>
        {currentAgent ? <AgentViewer /> : null}
      </ThemeProvider>
    </AntdThemeProvider>
  );
}
