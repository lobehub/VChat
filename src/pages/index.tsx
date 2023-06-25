import { ThemeProvider } from '@lobehub/ui';
import VrmViewer from '@/components/VrmViewer';
import Header from '@/components/Header';
import ChatBot from '@/components/ChatBot';
import SideNav from '@/components/SideNav';
import { useThemeStore } from '@/store/theme';

export default function Home() {
  const themeMode = useThemeStore((s) => s.themeMode);
  return (
    <ThemeProvider themeMode={themeMode}>
      <Header />
      <main>
        <div style={{ display: 'flex', height: '100%' }}>
          <SideNav />
          <div style={{ display: 'flex', width: '100%' }}>
            <div style={{ flex: 1 }}>
              <VrmViewer />
            </div>
            <div style={{ flex: 1 }}>
              <ChatBot />
            </div>
          </div>
        </div>
      </main>
    </ThemeProvider>
  );
}
