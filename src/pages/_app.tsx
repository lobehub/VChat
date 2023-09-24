import Header from '@/components/Header';
import SideNav from '@/components/SideNav';
import VrmViewer from '@/components/VrmViewer';
import { useAgentStore } from '@/store/agent';
import { useThemeStore } from '@/store/theme';
import '@/styles/globals.css';
import { ThemeProvider } from '@lobehub/ui';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  const themeMode = useThemeStore((s) => s.themeMode);
  const { currentAgent } = useAgentStore();
  return (
    <ThemeProvider themeMode={themeMode}>
      <Header />
      <main style={{ display: 'flex', width: '100%' }}>
        <SideNav />
        <div style={{ flexGrow: 1 }}>
          <Component {...pageProps} />
        </div>
        {currentAgent ? (
          <div style={{ flexBasis: '50%', flexShrink: 0 }}>
            <VrmViewer />
          </div>
        ) : null}
      </main>
    </ThemeProvider>
  );
}
