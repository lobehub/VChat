import { useThemeStore } from '@/store/theme';
import { Header as LobeHeader, ThemeSwitch } from '@lobehub/ui';
import { memo } from 'react';

const Header = () => {
  const [themeMode, setThemeMode] = useThemeStore((s) => [s.themeMode, s.setThemeMode]);
  return (
    <LobeHeader
      actions={[<ThemeSwitch onThemeSwitch={setThemeMode} themeMode={themeMode} key="theme" />]}
      logo={'Vidol.Chat'}
    />
  );
};

export default memo(Header);
