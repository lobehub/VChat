import { AGENT_INDEX_URL } from '@/constants/common';
import { useMarketStore } from '@/store/market';
import { Button, Input, Space } from 'antd';
import { createStyles } from 'antd-style';
import classNames from 'classnames';
import { memo } from 'react';

const useStyles = createStyles(({ css, token }) => ({
  content: css`
    display: flex;
    flex-direction: column;
  `,
  address: css`
    display: flex;
    align-items: center;
    justify-content: space-between;
  `,
  label: css`
    flex-shrink: 0;
  `,
  actions: css`
    margin-top: 12px;
    display: flex;
    justify-content: flex-end;
  `,
}));

interface AgentLoaderProps {
  style?: React.CSSProperties;
  className?: string;
}

const AgentLoader = (props: AgentLoaderProps) => {
  const { style, className } = props;
  const [agentIndexUrl, setAgentIndexUrl, fetchAgentIndex, agentLoading] = useMarketStore((s) => [
    s.agentIndexUrl,
    s.setAgentIndexUrl,
    s.fetchAgentIndex,
    s.agentLoading,
  ]);
  const { styles } = useStyles();
  return (
    <div className={classNames(styles.content, className)} style={style}>
      <div className={styles.address}>
        <div className={styles.label}>列表地址：</div>
        <Input
          value={agentIndexUrl}
          size="large"
          onChange={(e) => setAgentIndexUrl(e.target.value)}
        />
      </div>
      <div className={styles.actions}>
        <Space>
          <Button type="primary" loading={agentLoading} onClick={() => fetchAgentIndex()}>
            加载模型列表
          </Button>
          <Button onClick={() => setAgentIndexUrl(AGENT_INDEX_URL)}>重置</Button>
        </Space>
      </div>
    </div>
  );
};

export default memo(AgentLoader);
