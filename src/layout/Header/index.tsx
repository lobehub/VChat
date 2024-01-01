'use client';

import { useThemeStore } from '@/store/theme';
import { ActionIcon, Header as LobeHeader, ThemeSwitch } from '@lobehub/ui';
import { Space } from 'antd';
import { GithubIcon } from 'lucide-react';
import { memo } from 'react';

const Header = () => {
  const [themeMode, setThemeMode] = useThemeStore((s) => [s.themeMode, s.setThemeMode]);
  return (
    <LobeHeader
      logo={
        <Space align="center" size={16}>
          <span style={{ fontSize: 22, fontWeight: 'bolder' }}>Vidol.Chat</span>
        </Space>
      }
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

export default memo(Header);
