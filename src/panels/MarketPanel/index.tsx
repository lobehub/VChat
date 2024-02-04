'use client';

import Panel from '@/components/Panel';
import { useConfigStore } from '@/store/config';
import { useMarketStore } from '@/store/market';
import Agent from './Agent';
import Dance from './Dance';
import SideNav from './SideNav';
import { useStyles } from './style';

interface MarketPanelProps {
  style?: React.CSSProperties;
  className?: string;
}

const MarketPanel = (props: MarketPanelProps) => {
  const { style, className } = props;
  const { styles } = useStyles();
  const { tab } = useMarketStore();
  const { setPanel } = useConfigStore();

  return (
    <Panel
      style={style}
      className={className}
      onClose={() => setPanel('market', { open: false })}
      defaultCoordinates={{ x: 400, y: 400 }}
      title="虚拟商店"
    >
      <SideNav className="handle" />
      <div className={styles.content}>
        <Dance style={{ display: tab === 'dance' ? 'flex' : 'none' }} />
        <Agent style={{ display: tab === 'agent' ? 'flex' : 'none' }} />
      </div>
    </Panel>
  );
};

export default MarketPanel;
