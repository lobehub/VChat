import { Header as LobeHeader, TabsNav, ThemeSwitch } from '@lobehub/ui';
import { useThemeStore } from '@/store/theme';

const Header = () => {
  const [themeMode, setThemeMode] = useThemeStore((s) => [s.themeMode, s.setThemeMode]);
  return (
    <LobeHeader
      actions={[<ThemeSwitch onThemeSwitch={setThemeMode} themeMode={themeMode} key="theme" />]}
      logo={'Vidol.Chat'}
    />
  );
};

export default Header;
