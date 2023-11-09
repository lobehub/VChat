import { List } from 'antd';
import { createStyles } from 'antd-style';

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
  const data = [
    { label: '哇!最喜欢摸摸头!', value: 'head' },
    { label: '感觉又充满了力量呢!', value: 'arm' },
    { label: '哇塞，这个摸摸头的感觉好神奇!', value: 'foot' },
    { label: '摸摸头让我开心一整天!', value: 'chest' },
    { label: '听说被摸头是会长不高的呢!', value: 'belly' },
    { label: '干嘛戳我呀？', value: 'belly' },
  ];

  return (
    <List
      header={<div>触摸反应列表</div>}
      dataSource={data}
      renderItem={(item) => (
        <List.Item
          className={styles.listItem}
          actions={[
            <a key="list-loadmore-edit" onClick={}>
              edit
            </a>,
            <a key="list-loadmore-more">more</a>,
          ]}
        >
          <List.Item.Meta title={item.label}></List.Item.Meta>
        </List.Item>
      )}
      className={styles.list}
    />
  );
};

export default AreaList;
