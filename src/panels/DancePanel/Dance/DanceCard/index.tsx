import DanceInfo from '@/components/DanceInfo';
import { danceListSelectors, useDanceStore } from '@/store/dance';
import { DraggablePanel } from '@lobehub/ui';
import { Button, Popconfirm } from 'antd';
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
  const [
    showDanceSidebar,
    activateDance,
    deactivateDance,
    addAndPlayItem,
    setIsPlaying,
    unsubscribe,
  ] = useDanceStore((s) => [
    danceListSelectors.showSideBar(s),
    s.activateDance,
    s.deactivateDance,
    s.addAndPlayItem,
    s.setIsPlaying,
    s.unsubscribe,
  ]);

  const currentDance = useDanceStore((s) => danceListSelectors.currentDanceItem(s));

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
              if (currentDance) {
                addAndPlayItem(currentDance);
                setIsPlaying(true);
              }
            }}
            type={'primary'}
          >
            播放并添加到歌单
          </Button>,
          <Popconfirm
            key="delete"
            title="取消订阅？"
            description={`确定取消订阅音乐【${currentDance?.name}】吗？`}
            onConfirm={() => {
              if (currentDance) {
                unsubscribe(currentDance.danceId);
              }
            }}
            okText="确定"
            cancelText="取消"
          >
            <Button danger>取消订阅</Button>
          </Popconfirm>,
        ]}
      />
    </DraggablePanel>
  );
});

export default SideBar;
