import { List } from 'antd';
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
  const data = [
    { label: '头部', value: 'head' },
    { label: '手臂', value: 'arm' },
    { label: '腿部', value: 'foot' },
    { label: '胸部', value: 'chest' },
    { label: '腹部', value: 'belly' },
  ];

  return (
    <List
      header={<div style={{ padding: 12 }}>触摸区域列表</div>}
      dataSource={data}
      renderItem={(item) => (
        <List.Item className={styles.listItem} style={{ padding: 12 }}>
          {item.label}
        </List.Item>
      )}
      className={styles.list}
    />
  );
};

export default AreaList;
