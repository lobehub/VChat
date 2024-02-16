'use client';

import { useThemeStore } from '@/store/theme';
import { ActionIcon, Header as LobeHeader, Logo, ThemeSwitch } from '@lobehub/ui';
import { GithubIcon } from 'lucide-react';

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
        <ActionIcon
          key="github"
          // @ts-ignore
          icon={GithubIcon}
          onClick={() => {
            window.open('https://github.com/v-idol/vidol.chat');
          }}
        />,
      ]}
    />
  );
};

export default Header;
