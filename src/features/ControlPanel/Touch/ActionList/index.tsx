import { useTouchStore } from '@/store/touch';
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

  const data = actionConfig[currentTouchArea];
  return (
    <List
      header={<div>触摸反应列表</div>}
      dataSource={data}
      renderItem={(item) => (
        <List.Item
          className={styles.listItem}
          /* @ts-ignore */
          actions={[<ActionIcon icon={PlayIcon} key="play" />]}
        >
          <List.Item.Meta title={item.text}></List.Item.Meta>
        </List.Item>
      )}
      className={styles.list}
    />
  );
};

export default AreaList;
