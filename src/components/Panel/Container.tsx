import { useDraggable } from '@dnd-kit/core';
import { Tooltip } from 'antd';
import classNames from 'classnames';

import React, { PropsWithChildren, memo, useMemo, useRef } from 'react';

import { INITIAL_COORDINATES, INITIAL_Z_INDEX } from '@/constants/common';
import { useStyles } from './style';

interface ContainerProps {
  style?: React.CSSProperties;
  className?: string;
  title?: React.ReactNode;
  extra?: React.ReactNode;
  x: number;
  y: number;
  zIndex?: number;
  onFocus?: React.FocusEventHandler;
  onBlur?: React.FocusEventHandler;
  onClose: () => void;
  onMinify: () => void;
}

const Container = (props: PropsWithChildren<ContainerProps>) => {
  const {
    style,
    className,
    children,
    onClose,
    onMinify,
    x = INITIAL_COORDINATES.x,
    y = INITIAL_COORDINATES.y,
    title,
    extra,
    zIndex = INITIAL_Z_INDEX,
    onBlur,
    onFocus,
  } = props;
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

  const switches = useMemo(() => {
    const handleClose = () => {
      if (onClose) onClose();
    };

    const handleMinify = () => {
      if (onMinify) onMinify();
    };
    return [
      <Tooltip title="关闭" key="close">
        <div className={classNames(styles.button, styles.close)} onClick={handleClose} />
      </Tooltip>,
      <Tooltip title="最大化" key="max">
        <div className={classNames(styles.button, styles.max)} onClick={toggleFullScreen} />
      </Tooltip>,
      <Tooltip title="最小化" key="min">
        <div className={classNames(styles.button, styles.min)} onClick={handleMinify} />
      </Tooltip>,
    ];
  }, [onClose, styles.button, styles.close, styles.max, styles.min]);

  return (
    <div ref={setNodeRef} onFocus={onFocus} onBlur={onBlur}>
      <div
        className={classNames(styles.box, className)}
        style={{
          ...style,
          left: x,
          top: y,
          zIndex,
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
