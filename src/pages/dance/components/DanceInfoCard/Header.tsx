import { danceListSelectors, useDanceStore } from '@/store/dance';
import { Avatar } from '@lobehub/ui';
import { Button, Popconfirm } from 'antd';
import { memo } from 'react';
import { Center } from 'react-layout-kit';

import { deleteLocalDance } from '@/services/dance';
import { useRequest } from 'ahooks';
import { message } from 'antd';

import { useStyles } from './style';

// eslint-disable-next-line react/display-name
const Header = memo(() => {
  const { styles, theme } = useStyles();
  const currentDance = useDanceStore((s) => danceListSelectors.currentDanceItem(s));
  const { addAndPlayItem, deactivateDance, fetchDanceList } = useDanceStore();

  const { loading, run } = useRequest((dirname) => deleteLocalDance(dirname), {
    manual: true,
    onSuccess: (data) => {
      const { success, errorMessage } = data;
      if (success) {
        message.success('删除成功');
        deactivateDance();
        fetchDanceList();
      } else {
        message.error(errorMessage);
      }
    },
  });

  const { cover, name, dirname } = currentDance;

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
      <Popconfirm
        title="确定删除？"
        description="确定删除本地舞蹈文件吗？"
        onConfirm={() => run(dirname)}
        okText="确定"
        cancelText="取消"
      >
        <Button block loading={loading}>
          删除
        </Button>
      </Popconfirm>
    </Center>
  );
});

export default Header;
