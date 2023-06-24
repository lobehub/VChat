import { Header as LobeHeader, TabsNav, ThemeSwitch } from '@lobehub/ui';
import { type ThemeMode } from 'antd-style';
import { useThemeStore } from '@/store/useThemeStore';

const Header = () => {
  const [themeMode, setThemeMode] = useThemeStore((s) => [s.themeMode, s.setThemeMode]);
  return (
    <LobeHeader
      actions={[<ThemeSwitch onThemeSwitch={setThemeMode} themeMode={themeMode} key="theme" />]}
      logo={'Vidol.Chat'}
      // nav={
      //   <TabsNav
      //     items={[
      //       {
      //         key: 'home',
      //         label: '首页',
      //       },
      //       {
      //         key: 'docs',
      //         label: '使用文档',
      //       },
      //       {
      //         key: 'donate',
      //         label: 'Buy me Coffee',
      //       },
      //     ]}
      //   />
      // }
    />
  );
};

export default Header;
