import { useConfigStore } from '@/store/config';
import { Space, Tooltip } from 'antd';
import classNames from 'classnames';
import { PropsWithChildren, useRef, useState } from 'react';
import type { DraggableData, DraggableEvent } from 'react-draggable';
import Draggable from 'react-draggable';

import { useStyles } from './style';

interface ControlPanelProps {
  style?: React.CSSProperties;
  className?: string;
  tab?: string;
}

const ControlPanel = (props: PropsWithChildren<ControlPanelProps>) => {
  const { style, className, tab = 'agent', children } = props;
  const { styles } = useStyles();
  const { controlPanelOpen, setControlPanelOpen } = useConfigStore();
  const [bounds, setBounds] = useState({ left: 0, top: 0, bottom: 0, right: 0 });

  const draggleRef = useRef<HTMLDivElement>(null);

  const onStart = (_event: DraggableEvent, uiData: DraggableData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    setBounds({
      left: -targetRect.left + uiData.x - 800,
      right: clientWidth - (targetRect.right - uiData.x) + 800,
      top: -targetRect.top + uiData.y + 64,
      bottom: clientHeight - (targetRect.bottom - uiData.y) + 600,
    });
  };

  function toggleFullScreen() {
    if (!document.fullscreenElement) {
      draggleRef.current && draggleRef.current.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }

  return (
    <Draggable
      handle=".handle"
      bounds={bounds}
      nodeRef={draggleRef}
      onStart={(event, uiData) => onStart(event, uiData)}
    >
      <div className={classNames(styles.box, className)} style={style} ref={draggleRef}>
        <div className={classNames(styles.header, 'handle')} onDoubleClick={toggleFullScreen}>
          <Space>
            <Tooltip title="关闭">
              <div
                className={classNames(styles.button, styles.close)}
                onClick={() => {
                  setControlPanelOpen(false);
                }}
              />
            </Tooltip>
            <Tooltip title="最大化">
              <div className={classNames(styles.button, styles.max)} onClick={toggleFullScreen} />
            </Tooltip>
            <Tooltip title="最小化">
              <div
                className={classNames(styles.button, styles.min)}
                onClick={() => {
                  setControlPanelOpen(false);
                }}
              ></div>
            </Tooltip>
          </Space>
        </div>
        <div className={styles.container}>{children}</div>
      </div>
    </Draggable>
  );
};

export default ControlPanel;
