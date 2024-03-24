'use client';

import PanelContainer from '@/panels/PanelContainer';
import Dance from './Dance';
import { useStyles } from './style';

interface DancePanelProps {
  style?: React.CSSProperties;
  className?: string;
}

const DancePanel = (props: DancePanelProps) => {
  const { style, className } = props;
  const { styles } = useStyles();

  return (
    <PanelContainer style={style} className={className} panelKey="dance" title="舞蹈订阅">
      <div className={styles.content}>
        <Dance />
      </div>
    </PanelContainer>
  );
};

export default DancePanel;
