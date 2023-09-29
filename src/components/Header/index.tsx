/* eslint-disable @next/next/no-img-element */
import { useThemeStore } from '@/store/theme';
import { buildUrl } from '@/utils/buildUrl';
import { Header as LobeHeader, ThemeSwitch } from '@lobehub/ui';
import { Space } from 'antd';
import { memo } from 'react';

const Header = () => {
  const [themeMode, setThemeMode] = useThemeStore((s) => [s.themeMode, s.setThemeMode]);
  return (
    <LobeHeader
      actions={[<ThemeSwitch onThemeSwitch={setThemeMode} themeMode={themeMode} key="theme" />]}
      logo={
        <Space align="center" size={16}>
          <img src={buildUrl('/logo.png')} width={48} height={48} alt="logo" />
          <span style={{ fontSize: 22, fontWeight: 'bolder' }}>Vidol.Chat</span>
        </Space>
      }
    />
  );
};

export default memo(Header);
