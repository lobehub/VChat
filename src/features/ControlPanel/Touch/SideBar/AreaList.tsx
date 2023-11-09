import { useTouchStore } from '@/store/touch';
import { TouchAreaEnum } from '@/store/type';
import { List } from 'antd';
import classNames from 'classnames';

import { createStyles } from 'antd-style';

const useStyles = createStyles(({ css, token }) => ({
  list: css`
    width: 240px;
    border-right: 1px solid ${token.colorBorder};
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
  const { currentTouchArea, setCurrentTouchArea } = useTouchStore();

  const data = [
    { label: '头部', value: TouchAreaEnum.Head },
    { label: '手臂', value: TouchAreaEnum.Arm },
    { label: '腿部', value: TouchAreaEnum.Leg },
    { label: '胸部', value: TouchAreaEnum.Chest },
    { label: '腹部', value: TouchAreaEnum.Belly },
  ];

  return (
    <List
      header={<div style={{ padding: 12 }}>触摸区域列表</div>}
      dataSource={data}
      renderItem={(item) => (
        <List.Item
          className={classNames(styles.listItem, {
            [styles.active]: item.value === currentTouchArea,
          })}
          onClick={() => setCurrentTouchArea(item.value)}
          style={{ padding: 12 }}
        >
          {item.label}
        </List.Item>
      )}
      className={styles.list}
    />
  );
};

export default AreaList;
