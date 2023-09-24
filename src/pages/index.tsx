import AgentList from '@/components/AgentList';
import { GridBackground } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import { Center } from 'react-layout-kit';

const useStyles = createStyles(({ css }) => ({
  background: css`
    width: 90%;
    margin: -24px 0 -12px;
  `,
  title: css`
    z-index: 2;
    margin-top: 24px;
    font-size: 56px;
    font-weight: 800;
  `,
}));

const Agent = () => {
  const { theme, styles } = useStyles();
  return (
    <div style={{ paddingLeft: 24, paddingRight: 24, width: 1024, margin: ' 0 auto' }}>
      <Center>
        <h1 className={styles.title}>Find & Use The Best Agents</h1>
        <GridBackground
          animation
          className={styles.background}
          colorFront={theme.colorText}
          random
        />
      </Center>
      <AgentList />
    </div>
  );
};

export default Agent;
