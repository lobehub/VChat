import Panel from '@/components/Panel';
import { useConfigStore } from '@/store/config';
import { memo } from 'react';
import Agent from './Agent';
import Config from './Config';
import Dance from './Dance';
import SideNav from './SideNav';
import Touch from './Touch';
import { useStyles } from './style';

interface ControlPanelProps {
  style?: React.CSSProperties;
  className?: string;
}

const ControlPanel = (props: ControlPanelProps) => {
  const { style, className } = props;
  const { styles } = useStyles();
  const [setControlPanelOpen, tab] = useConfigStore((s) => [s.setControlPanelOpen, s.tab]);

  return (
    <Panel
      style={style}
      className={className}
      onClose={() => setControlPanelOpen(false)}
      title="控制面板"
    >
      <SideNav className="handle" />
      <div className={styles.content}>
        {tab === 'dance' ? <Dance /> : null}
        {tab === 'agent' ? <Agent /> : null}
        {tab === 'touch' ? <Touch /> : null}
        {tab === 'config' ? <Config /> : null}
      </div>
    </Panel>
  );
};

export default memo(ControlPanel);
