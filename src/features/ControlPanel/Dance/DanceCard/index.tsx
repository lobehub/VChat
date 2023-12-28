import DanceInfo from '@/components/DanceInfo';
import { deleteLocalDance } from '@/services/dance';
import { danceListSelectors, useDanceStore } from '@/store/dance';
import { DraggablePanel } from '@lobehub/ui';
import { useRequest } from 'ahooks';
import { Button, Popconfirm, message } from 'antd';
import { createStyles } from 'antd-style';
import { memo, useState } from 'react';

const useStyles = createStyles(({ css, token }) => ({
  content: css`
    display: flex;
    flex-direction: column;
    height: 100% !important;
  `,
  header: css`
    border-bottom: 1px solid ${token.colorBorder};
  `,
}));

// eslint-disable-next-line react/display-name
const SideBar = memo(() => {
  const { styles } = useStyles();
  const [tempId, setTempId] = useState<string>('');
  const [showDanceSidebar, activateDance, deactivateDance, danceList, addAndPlayItem] =
    useDanceStore((s) => [
      danceListSelectors.showSideBar(s),
      s.activateDance,
      s.deactivateDance,
      s.danceList,
      s.addAndPlayItem,
    ]);

  const currentDance = useDanceStore((s) => danceListSelectors.currentDanceItem(s));

  const { loading, run } = useRequest((agentId) => deleteLocalDance(agentId), {
    manual: true,
    onSuccess: (data) => {
      const { success, errorMessage } = data;
      if (success) {
        message.success('删除成功');
        deactivateDance();
      } else {
        message.error(errorMessage);
      }
    },
  });

  const { danceId } = currentDance || {};

  return (
    <DraggablePanel
      classNames={{ content: styles.content }}
      minWidth={280}
      defaultSize={{ width: 280 }}
      maxWidth={400}
      mode={'fixed'}
      expand={showDanceSidebar}
      onExpandChange={(show) => {
        if (!show) {
          setTempId(useDanceStore.getState().currentIdentifier);
          deactivateDance();
        } else if (tempId) {
          activateDance(tempId);
        }
      }}
      placement={'right'}
    >
      <DanceInfo
        dance={currentDance}
        actions={[
          <Button
            key="play"
            onClick={() => {
              if (currentDance) addAndPlayItem(currentDance);
            }}
            type={'primary'}
          >
            播放并添加到歌单
          </Button>,
          <Popconfirm
            key="delete"
            title="确定删除？"
            description="确定删除本地舞蹈文件吗？"
            onConfirm={() => run(danceId)}
            okText="确定"
            cancelText="取消"
          >
            <Button danger loading={loading}>
              删除
            </Button>
          </Popconfirm>,
        ]}
      />
    </DraggablePanel>
  );
});

export default SideBar;
