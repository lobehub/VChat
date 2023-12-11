import { DEFAULT_DANCE } from '@/constants/dance';
import { deleteLocalDance } from '@/services/dance';
import { danceListSelectors, useDanceStore } from '@/store/dance';
import { Avatar } from '@lobehub/ui';
import { useRequest } from 'ahooks';
import { Button, Popconfirm, Space, message } from 'antd';
import { memo } from 'react';
import { Center } from 'react-layout-kit';

import { useStyles } from './style';

// eslint-disable-next-line react/display-name
const Header = memo(() => {
  const { styles, theme } = useStyles();
  const currentDance = useDanceStore((s) => danceListSelectors.currentDanceItem(s));
  const { addAndPlayItem, deactivateDance, fetchDanceList } = useDanceStore();

  const { loading, run } = useRequest((agentId) => deleteLocalDance(agentId), {
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

  const { cover, name, danceId } = currentDance;

  return (
    <Center className={styles.container} gap={16}>
      <Avatar avatar={cover} shape="square" background={theme.colorFillTertiary} size={120} />
      <div className={styles.title}>{name}</div>
      <Space>
        <Button
          onClick={() => {
            // Router.push('/chat');
            addAndPlayItem(currentDance);
          }}
          type={'primary'}
        >
          播放并添加到歌单
        </Button>
        {DEFAULT_DANCE.danceId !== danceId ? (
          <Popconfirm
            title="确定删除？"
            description="确定删除本地舞蹈文件吗？"
            onConfirm={() => run(danceId)}
            okText="确定"
            cancelText="取消"
          >
            <Button danger loading={loading}>
              删除
            </Button>
          </Popconfirm>
        ) : null}
      </Space>
    </Center>
  );
});

export default Header;
