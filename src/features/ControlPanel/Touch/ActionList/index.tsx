import { speakCharacter } from '@/features/messages/speakCharacter';
import { useSessionStore } from '@/store/session';
import { useTouchStore } from '@/store/touch';
import { useViewerStore } from '@/store/viewer';
import { ActionIcon } from '@lobehub/ui';
import { List } from 'antd';
import { createStyles } from 'antd-style';
import { PlayIcon } from 'lucide-react';

const useStyles = createStyles(({ css, token }) => ({
  list: css`
    width: 100%;
    padding: 24px;
  `,
  listItem: css`
    &:hover {
      cursor: pointer;
    }
  `,
  active: css`
    background-color: ${token.controlItemBgActiveHover};
  `,
}));

const AreaList = () => {
  const { styles } = useStyles();
  const { actionConfig, currentTouchArea } = useTouchStore();
  const { currentAgent } = useSessionStore();
  const { viewer } = useViewerStore();

  const data = actionConfig[currentTouchArea];
  return (
    <List
      header={<div>触摸反应列表</div>}
      dataSource={data}
      renderItem={(item) => (
        <List.Item
          className={styles.listItem}
          actions={[
            <ActionIcon
              /* @ts-ignore */
              icon={PlayIcon}
              key="play"
              onClick={() => {
                speakCharacter(
                  {
                    emotion: item.emotion,
                    tts: {
                      ...currentAgent.tts,
                      message: item.text,
                    },
                  },
                  viewer,
                );
              }}
            />,
          ]}
        >
          <List.Item.Meta title={item.text}></List.Item.Meta>
        </List.Item>
      )}
      className={styles.list}
    />
  );
};

export default AreaList;
