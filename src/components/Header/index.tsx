import { Header as LobeHeader,TabsNav  } from '@lobehub/ui';

const Header =  () => {
  return <LobeHeader actions={'ACTIONS'} logo={'LOGO'} nav={<TabsNav
    items={[
      {
        key: 'home',
        label: 'Home',
      },
      {
        key: 'components',
        label: 'Components',
      },
      {
        key: 'changelog',
        label: 'Changelog',
      },
    ]}
  />} />;
};

export default Header;