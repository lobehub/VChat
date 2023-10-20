import { SearchBar } from '@lobehub/ui';
import { memo } from 'react';
import { Flexbox } from 'react-layout-kit';

import { useStyles } from './style';

// eslint-disable-next-line react/display-name
const Header = memo(() => {
  const { styles, theme } = useStyles();

  return (
    <Flexbox className={styles.container} gap={16}>
      <SearchBar shortKey="f" enableShortKey />
    </Flexbox>
  );
});

export default Header;
