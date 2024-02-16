import { useDraggable } from '@dnd-kit/core';
import { Tooltip } from 'antd';
import classNames from 'classnames';

import React, { PropsWithChildren, memo, useMemo, useRef, useState } from 'react';

import { useStyles } from './style';

interface ContainerProps {
  style?: React.CSSProperties;
  className?: string;
  title?: React.ReactNode;
  extra?: React.ReactNode;
  x: number;
  y: number;
  onClose: () => void;
}

const Container = (props: PropsWithChildren<ContainerProps>) => {
  const { style, className, children, onClose, x, y, title, extra } = props;
  const [focus, setFocus] = useState(false);
  const { styles } = useStyles(focus);

  const { attributes, listeners, transform, setNodeRef, setActivatorNodeRef } = useDraggable({
    id: 'draggable',
  });

  const transformstyle = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  const draggleRef = useRef<HTMLDivElement>(null);

  function toggleFullScreen() {
    if (!document.fullscreenElement) {
      draggleRef.current && draggleRef.current.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }

  const switches = useMemo(() => {
    const handleClose = () => {
      if (onClose) onClose();
    };
    return [
      <Tooltip title="关闭" key="close">
        <div className={classNames(styles.button, styles.close)} onClick={handleClose} />
      </Tooltip>,
      <Tooltip title="最大化" key="max">
        <div className={classNames(styles.button, styles.max)} onClick={toggleFullScreen} />
      </Tooltip>,
      <Tooltip title="最小化" key="min">
        <div className={classNames(styles.button, styles.min)} onClick={handleClose} />
      </Tooltip>,
    ];
  }, [onClose, styles.button, styles.close, styles.max, styles.min]);

  return (
    <div ref={setNodeRef} onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}>
      <div
        className={classNames(styles.box, className)}
        style={{
          ...style,
          left: x,
          top: y,
          ...transformstyle,
        }}
        ref={draggleRef}
        {...attributes}
      >
        <div
          className={classNames(styles.header)}
          onDoubleClick={toggleFullScreen}
          ref={setActivatorNodeRef}
          {...listeners}
        >
          <div className={styles.swtich}>{switches}</div>
          <div className={styles.title}>{title ? title : null}</div>
          <div className={styles.extra}>{extra ? extra : null}</div>
        </div>
        <div className={styles.container}>{children}</div>
      </div>
    </div>
  );
};

export default memo(Container);
