import { useAgentStore } from '@/store/agent';
import { ActionIcon, GridBackground, TabsNav } from '@lobehub/ui';
import { Space } from 'antd';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import { Loader2Icon } from 'lucide-react';
import { memo, useMemo, useState } from 'react';
import { Center, Flexbox } from 'react-layout-kit';
import AgentCard from './AgentCard';
import AgentIndex from './AgentIndex';
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
  const [tab, setTab] = useState('installed');
  const [fetchAgentList, agentList, loading] = useAgentStore((s) => [
    s.fetchAgentList,
    s.agentList,
    s.loading,
  ]);

  const TabList = useMemo(() => {
    console.log('tablist', agentList, loading);
    return (
      <Flexbox style={{ marginBottom: 12 }} horizontal align="center" distribution="space-between">
        <TabsNav
          activeKey={tab}
          onChange={(key) => {
            setTab(key);
          }}
          items={[
            {
              key: 'installed',
              label: '我的角色',
            },
            {
              key: 'index',
              label: '角色卡池',
            },
          ]}
        />
        {tab === 'installed' ? (
          <Space>
            共 {agentList.length} 项{' '}
            <ActionIcon
              icon={Loader2Icon}
              loading={loading}
              title="重新加载"
              onClick={fetchAgentList}
            />
          </Space>
        ) : null}
      </Flexbox>
    );
  }, [agentList, fetchAgentList, loading, tab]);

  return (
    <div style={style} className={classNames(className, styles.container)}>
      <div className={styles.content}>
        <Center>
          <h1 className={styles.title}>选择你的虚拟角色</h1>
          <GridBackground
            animation
            className={styles.background}
            colorFront={theme.colorText}
            random
          />
        </Center>
        {TabList}
        {tab === 'installed' ? <AgentList /> : null}
        {tab === 'index' ? <AgentIndex /> : null}
      </div>
      <AgentCard />
    </div>
  );
};

export default memo(Agent);
