import { Input } from '@lobehub/ui';
import { memo } from 'react';
import { Center } from 'react-layout-kit';

import { useStyles } from './style';

// eslint-disable-next-line react/display-name
const Header = memo(() => {
  const { styles, theme } = useStyles();

  return (
    <Center className={styles.container} gap={16}>
      <Input></Input>
    </Center>
  );
});

export default Header;
