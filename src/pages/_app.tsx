import Header from '@/components/Header';
import SideNav from '@/components/SideNav';
import VrmViewer from '@/components/VrmViewer';
import { useAgentStore } from '@/store/agent';
import { useThemeStore } from '@/store/theme';
import '@/styles/globals.css';
import { DraggablePanel, ThemeProvider } from '@lobehub/ui';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  const themeMode = useThemeStore((s) => s.themeMode);
  const { currentAgent } = useAgentStore();
  return (
    <ThemeProvider themeMode={themeMode}>
      <Header />
      <main style={{ display: 'flex', width: '100%' }}>
        <SideNav />
        <div style={{ height: `calc(100vh - 64px)`, overflow: 'scroll' }}>
          <Component {...pageProps} />
        </div>

        <DraggablePanel placement="left" minWidth={800}>
          {currentAgent ? <VrmViewer /> : <div>请从角色列表中选择角色</div>}
        </DraggablePanel>
      </main>
    </ThemeProvider>
  );
}
