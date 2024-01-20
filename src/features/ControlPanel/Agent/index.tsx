import { useAgentStore } from '@/store/agent';
import { GridBackground } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import { memo } from 'react';
import { Center } from 'react-layout-kit';
import AgentCard from './AgentCard';
import AgentList from './AgentList';

const useStyles = createStyles(({ css }) => ({
  background: css`
    width: 90%;
    margin: -24px 0 -12px;
  `,
  title: css`
    z-index: 2;
    margin-top: 24px;
    font-size: 36px;
    font-weight: 800;
  `,
  container: css`
    position: relative;
    display: flex;
    width: 100%;
    height: 100%;
    min-height: 500px;
  `,
  content: css`
    padding-left: 24px;
    padding-right: 24px;
    flex-grow: 1;
    overflow-y: auto;
  `,
}));

interface AgentProps {
  style?: React.CSSProperties;
  className?: string;
}

const Agent = (props: AgentProps) => {
  const { theme, styles } = useStyles();
  const { style, className } = props;

  const [loading, localAgentList] = useAgentStore((s) => [s.loading, s.localAgentList]);

  return (
    <div style={style} className={classNames(className, styles.container)}>
      <div className={styles.content}>
        <Center>
          <h1 className={styles.title}>Hello, Let&apos;s Chat!</h1>
          <GridBackground
            animation
            className={styles.background}
            colorFront={theme.colorText}
            random
          />
        </Center>
        <AgentList title="好友列表" loading={loading} dataSource={localAgentList} />
      </div>
      <AgentCard />
    </div>
  );
};

export default memo(Agent);
