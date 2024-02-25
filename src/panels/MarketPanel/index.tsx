'use client';

import Panel from '@/components/Panel';
import { FOCUS_Z_INDEX, INITIAL_Z_INDEX } from '@/constants/common';
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
  const tab = useMarketStore((s) => s.tab);
  const [panel, setPanel] = useConfigStore((s) => [s.panel, s.setPanel]);

  return (
    <Panel
      style={style}
      className={className}
      onFocus={() => setPanel('market', { zIndex: FOCUS_Z_INDEX })}
      onBlur={() => setPanel('market', { zIndex: INITIAL_Z_INDEX })}
      zIndex={panel.market.zIndex}
      coordinates={panel.market.coordinates}
      onCoordinatesChange={(coordinates) => setPanel('market', { coordinates })}
      onClose={() => setPanel('market', { open: false })}
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
