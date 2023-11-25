import Panel from '@/components/Panel';
import { useConfigStore } from '@/store/config';
import Agent from './Agent';
import Chat from './Chat';
import Config from './Config';
import Dance from './Dance';
import SideNav from './SideNav';
import Touch from './Touch';
import { useStyles } from './style';

interface ControlPanelProps {
  style?: React.CSSProperties;
  className?: string;
  tab?: string;
}

const ControlPanel = (props: ControlPanelProps) => {
  const { style, className, tab = 'agent' } = props;
  const { styles } = useStyles();
  const { setControlPanelOpen } = useConfigStore();

  return (
    <Panel style={style} className={className} onClose={() => setControlPanelOpen(false)}>
      <SideNav className="handle" />
      <div className={styles.content}>
        {tab === 'dance' ? <Dance /> : null}
        {tab === 'agent' ? <Agent /> : null}
        {tab === 'chat' ? <Chat /> : null}
        {tab === 'touch' ? <Touch /> : null}
        {tab === 'config' ? <Config /> : null}
      </div>
    </Panel>
  );
};

export default ControlPanel;
