import { useConfigStore } from '@/store/config';
import { ActionIcon, SearchBar } from '@lobehub/ui';
import { Plus } from 'lucide-react';
import { memo } from 'react';

import { useStyles } from './style';

// eslint-disable-next-line react/display-name
const Header = memo(() => {
  const { styles } = useStyles();
  const { setTab } = useConfigStore();

  return (
    <div className={styles.header}>
      <SearchBar shortKey="f" enableShortKey placeholder="搜索" style={{ width: '220px' }} />
      {/* @ts-ignore */}
      <ActionIcon icon={Plus} onClick={() => setTab('agent')} />
    </div>
  );
});

export default Header;
