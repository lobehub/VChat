import { Layout, ThemeProvider } from '@lobehub/ui';
import VrmViewer from '@/components/VrmViewer';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useThemeStore } from '@/store/useThemeStore';

export default function Home() {
  const themeMode = useThemeStore((s) => s.themeMode);
  return (
    <ThemeProvider themeMode={themeMode}>
      <Header />
      <main>
        <VrmViewer />
      </main>
      <Footer />
    </ThemeProvider>
  );
}
