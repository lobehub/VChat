import { useDraggable } from '@dnd-kit/core';
import { Space, Tooltip } from 'antd';
import classNames from 'classnames';

import React, { PropsWithChildren, useRef } from 'react';

import { useStyles } from './style';

interface ContainerProps {
  style?: React.CSSProperties;
  className?: string;
  x: number;
  y: number;
  onClose: () => void;
}

const Container = (props: PropsWithChildren<ContainerProps>) => {
  const { style, className, children, onClose, x, y } = props;
  const { styles } = useStyles();

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

  return (
    <div ref={setNodeRef}>
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
          {...listeners}
          onDoubleClick={toggleFullScreen}
          ref={setActivatorNodeRef}
        >
          <Space data-no-dnd="true">
            <Tooltip title="关闭">
              <div
                className={classNames(styles.button, styles.close)}
                onClick={() => {
                  onClose();
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
                  onClose();
                }}
              ></div>
            </Tooltip>
          </Space>
        </div>
        <div className={styles.container}>{children}</div>
      </div>
    </div>
  );
};

export default Container;
