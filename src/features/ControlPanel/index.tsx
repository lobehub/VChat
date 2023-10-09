import classNames from 'classnames';
import Draggable from 'react-draggable';
import Agent from './Agent';
import Dance from './Dance';
import { useStyles } from './style';

interface ControlPanelProps {
  style?: React.CSSProperties;
  className?: string;
  tab?: string;
}

const ControlPanel = (props: ControlPanelProps) => {
  const { style, className, tab = 'agent' } = props;
  const { styles } = useStyles();

  return (
    <Draggable>
      <div className={classNames(styles.box, className)} style={style}>
        {/* <SideNav /> */}
        {tab === 'dance' ? <Dance /> : null}
        {tab === 'agent' ? <Agent /> : null}
      </div>
    </Draggable>
  );
};

export default ControlPanel;
