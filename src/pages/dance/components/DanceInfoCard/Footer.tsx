import { danceListSelectors, useDanceStore } from '@/store/dance';
import { memo } from 'react';
import { Center } from 'react-layout-kit';

import { useStyles } from './style';

// eslint-disable-next-line react/display-name
const Footer = memo(() => {
  const { styles } = useStyles();
  const currentDance = useDanceStore((s) => danceListSelectors.currentDanceItem(s));

  const { readme } = currentDance;

  return (
    <Center className={styles.footer} gap={16}>
      <div className={styles.desc}>{readme}</div>
    </Center>
  );
});

export default Footer;
