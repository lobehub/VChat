import { ThemeProvider } from '@lobehub/ui';
import VrmViewer from '@/components/VrmViewer';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SideNav from '@/components/SideNav';
import { useThemeStore } from '@/store/useThemeStore';

export default function Home() {
  const themeMode = useThemeStore((s) => s.themeMode);
  return (
    <ThemeProvider themeMode={themeMode}>
      <Header />
      <main>
        <div style={{ display: 'flex', height: '100%' }}>
          <SideNav />
          <VrmViewer />
        </div>
      </main>
      {/* <Footer /> */}
    </ThemeProvider>
  );
}
