import { useThemeStore } from '@/store/theme';
import { buildUrl } from '@/utils/buildUrl';
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
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={buildUrl('/logo.png')} width={48} height={48} alt="logo" />
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
