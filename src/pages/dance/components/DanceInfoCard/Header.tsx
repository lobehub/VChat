import { danceListSelectors, useDanceStore } from '@/store/dance';
import { Avatar } from '@lobehub/ui';
import { Button } from 'antd';
import { memo } from 'react';
import { Center } from 'react-layout-kit';

import { useStyles } from './style';

// eslint-disable-next-line react/display-name
const Header = memo(() => {
  const { styles, theme } = useStyles();
  const currentDance = useDanceStore((s) => danceListSelectors.currentDanceItem(s));
  const { addAndPlayItem } = useDanceStore();

  const { cover, name } = currentDance;

  return (
    <Center className={styles.container} gap={16}>
      <Avatar
        avatar={cover}
        shape="square"
        background={theme.colorFillTertiary}
        className={styles.avatar}
        size={200}
      />
      <div className={styles.title}>{name}</div>
      <Button
        block
        onClick={() => {
          // Router.push('/chat');
          addAndPlayItem(currentDance);
        }}
        type={'primary'}
      >
        播放并添加到歌单
      </Button>
      <Button block onClick={() => {}}>
        删除
      </Button>
    </Center>
  );
});

export default Header;
