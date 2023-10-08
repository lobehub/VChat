import classNames from 'classnames';
import Draggable from 'react-draggable';
import SideNav from './SideNav';
import { useStyles } from './style';

interface ControlPanelProps {
  style?: React.CSSProperties;
  className?: string;
  tab?: string;
}

const ControlPanel = (props: ControlPanelProps) => {
  const { style, className, tab } = props;
  const { styles } = useStyles();

  return (
    <Draggable>
      <div className={classNames(styles.box, className)} style={style}>
        <SideNav />
      </div>
    </Draggable>
  );
};

export default ControlPanel;
