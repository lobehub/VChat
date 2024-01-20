import { DraggablePanel } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import { memo, useState } from 'react';
import Header from './Header';
import SessionList from './SessionList';

const useStyles = createStyles(({ css, token }) => ({
  content: css`
    display: flex;
    flex-direction: column;
  `,
  header: css`
    border-bottom: 1px solid ${token.colorBorder};
  `,
}));

const SideBar = () => {
  const { styles } = useStyles();
  const [searchName, setSearchName] = useState<string>();

  return (
    <DraggablePanel
      className={styles.content}
      minWidth={280}
      defaultSize={{ width: 280 }}
      maxWidth={400}
      mode={'fixed'}
      placement={'left'}
    >
      <Header
        value={searchName}
        onChange={(value) => {
          setSearchName(value);
        }}
      />
      <SessionList filter={searchName} />
    </DraggablePanel>
  );
};

export default memo(SideBar);
