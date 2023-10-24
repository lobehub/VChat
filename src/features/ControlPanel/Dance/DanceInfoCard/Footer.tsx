import { danceListSelectors, useDanceStore } from '@/store/dance';
import { memo } from 'react';

import { useStyles } from './style';

// eslint-disable-next-line react/display-name
const Footer = memo(() => {
  const { styles } = useStyles();
  const currentDance = useDanceStore((s) => danceListSelectors.currentDanceItem(s));

  const { readme } = currentDance;

  return (
    <div className={styles.footer}>
      <div className={styles.desc}>{readme}</div>
    </div>
  );
});

export default Footer;
