import { DEFAULT_TTS } from '@/features/constants/ttsParam';
import { textsToScreenplay } from '@/features/messages/messages';
import { speakCharacter } from '@/features/messages/speakCharacter';
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
                console.log('DEFAULT_TTS', DEFAULT_TTS);
                const aiTalks = textsToScreenplay([item.text], DEFAULT_TTS);
                console.log('aiTalks', aiTalks);
                speakCharacter(aiTalks[0], viewer);
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
