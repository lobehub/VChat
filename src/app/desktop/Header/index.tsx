'use client';

import { useThemeStore } from '@/store/theme';
import { Header as LobeHeader, Logo, ThemeSwitch } from '@lobehub/ui';

const Header = () => {
  const [themeMode, setThemeMode] = useThemeStore((s) => [s.themeMode, s.setThemeMode]);
  return (
    <LobeHeader
      logo={<Logo extra={'V-idol'} size={36} type={'combine'} />}
      actions={[
        <ThemeSwitch
          onThemeSwitch={(mode) => setThemeMode(mode)}
          themeMode={themeMode}
          key="theme"
        />,
      ]}
    />
  );
};

export default Header;
