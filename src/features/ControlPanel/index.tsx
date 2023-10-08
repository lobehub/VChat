import classNames from 'classnames';
import { useRef, useState } from 'react';
import type { DraggableData, DraggableEvent } from 'react-draggable';
import Draggable from 'react-draggable';

import Agent from './Agent';
import Dance from './Dance';
import SideNav from './SideNav';
import { useStyles } from './style';

interface ControlPanelProps {
  style?: React.CSSProperties;
  className?: string;
  tab?: string;
}

const ControlPanel = (props: ControlPanelProps) => {
  const { style, className, tab = 'agent' } = props;
  const { styles } = useStyles();
  const [bounds, setBounds] = useState({ left: 0, top: 0, bottom: 0, right: 0 });

  const draggleRef = useRef<HTMLDivElement>(null);

  const onStart = (_event: DraggableEvent, uiData: DraggableData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y + 64,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };

  return (
    <Draggable
      handle=".handle"
      bounds={bounds}
      nodeRef={draggleRef}
      onStart={(event, uiData) => onStart(event, uiData)}
    >
      <div className={classNames(styles.box, className)} style={style} ref={draggleRef}>
        <SideNav />
        {tab === 'dance' ? <Dance /> : null}
        {tab === 'agent' ? <Agent /> : null}
      </div>
    </Draggable>
  );
};

export default ControlPanel;
