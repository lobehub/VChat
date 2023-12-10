import { DEFAULT_AGENTS } from '@/constants/agent';
import { useAgentStore } from '@/store/agent';
import { GridBackground } from '@lobehub/ui';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import { memo, useEffect } from 'react';
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

  const [loading, fetchLocalAgentList, localAgentList] = useAgentStore((s) => [
    s.loading,
    s.fetchLocalAgentList,
    s.localAgentList,
  ]);

  useEffect(() => {
    fetchLocalAgentList();
  }, [fetchLocalAgentList]);

  return (
    <div style={style} className={classNames(className, styles.container)}>
      <div className={styles.content}>
        <Center>
          <h1 className={styles.title}>我的虚拟偶像</h1>
          <GridBackground
            animation
            className={styles.background}
            colorFront={theme.colorText}
            random
          />
        </Center>
        <AgentList title="示例角色" loading={false} dataSource={DEFAULT_AGENTS} />
        <AgentList title="本地角色" loading={loading} dataSource={localAgentList} />
      </div>
      <AgentCard />
    </div>
  );
};

export default memo(Agent);
