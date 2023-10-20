import { useConfigStore } from '@/store/config';
import { ActionIcon, SearchBar } from '@lobehub/ui';
import { Plus } from 'lucide-react';
import { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import { useStyles } from './style';

// eslint-disable-next-line react/display-name
const Header = memo(() => {
  const { styles } = useStyles();
  const { setTab } = useConfigStore();

  return (
    <Flexbox className={styles.container} direction="horizontal" gap={16}>
      <SearchBar shortKey="f" enableShortKey placeholder="搜索" />
      {/* @ts-ignore */}
      <ActionIcon icon={Plus} onClick={() => setTab('agent')} />
    </Flexbox>
  );
});

export default Header;
