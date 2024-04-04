import { DraggablePanel } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import { memo, useState } from 'react';
import Header from './Header';
import SessionList from './SessionList/List';

const useStyles = createStyles(({ css, token }) => ({
  content: css`
    display: flex;
    flex-direction: column;
  `,
  header: css`
    border-bottom: 1px solid ${token.colorBorder};
  `,
  list: css`
    padding: 8px;
  `,
}));

const SideBar = () => {
  const { styles } = useStyles();
  const [searchName, setSearchName] = useState<string>();

  return (
    <DraggablePanel
      className={styles.content}
      minWidth={256}
      defaultSize={{ width: 256 }}
      maxWidth={316}
      mode={'fixed'}
      placement={'left'}
    >
      <Header
        value={searchName}
        onChange={(value) => {
          setSearchName(value);
        }}
      />
      <div className={styles.list}>
        <SessionList filter={searchName} />
      </div>
    </DraggablePanel>
  );
};

export default memo(SideBar);
